/**
 * Fetch product images for every perfume via the Amazon Product Advertising
 * API (PA-API 5.0) and write them to src/data/perfumeImages.json (id -> image).
 *
 * You need an approved Amazon Associates account with PA-API access, then set:
 *
 *   export AMAZON_ACCESS_KEY=AKIA...
 *   export AMAZON_SECRET_KEY=...
 *   export AMAZON_PARTNER_TAG=yourtag-20      # your Associates tracking id
 *   # optional, default to US:
 *   export AMAZON_HOST=webservices.amazon.com
 *   export AMAZON_REGION=us-east-1
 *   export AMAZON_MARKETPLACE=www.amazon.com
 *
 * Then run:   node scripts/fetch-amazon-images.mjs
 *   --region us|uk|in   which marketplace to query (default us). Picks the
 *                       right PA-API endpoint and reads region-specific creds:
 *                       AMAZON_ACCESS_KEY_UK / AMAZON_SECRET_KEY_UK /
 *                       AMAZON_PARTNER_TAG_UK (or VITE_AMAZON_TAG_UK), falling
 *                       back to the un-suffixed vars. Product images are the
 *                       same across marketplaces, so you normally only need one
 *                       region — use another to fill any gaps the first missed.
 *   --dupes   also fetch images for the dupe products (writes dupe:<id> keys)
 *   --force   re-fetch ids that already have an image (default: skip them)
 *
 * Notes:
 *  - Requests are throttled to ~1/sec (PA-API's default limit) with backoff.
 *  - The script is resumable: it merges into the existing JSON and skips ids
 *    that already have an image unless --force is passed.
 *  - PA-API image URLs point at Amazon's CDN and are intended to be shown
 *    alongside a link to Amazon — your cards already link out via affiliate.
 *  - No third-party dependencies; SigV4 is done with node:crypto.
 */

import crypto from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { PERFUMES } from '../src/data/perfumes.js'

// PA-API endpoints per marketplace. Access is granted per region, so each
// region uses its own credentials + partner tag (see credential resolution).
const REGIONS = {
  us: { host: 'webservices.amazon.com',   region: 'us-east-1', marketplace: 'www.amazon.com' },
  uk: { host: 'webservices.amazon.co.uk', region: 'eu-west-1', marketplace: 'www.amazon.co.uk' },
  in: { host: 'webservices.amazon.in',    region: 'eu-west-1', marketplace: 'www.amazon.in' },
}

const args = process.argv.slice(2)
const DO_DUPES = args.includes('--dupes')
const FORCE = args.includes('--force')
const regionArg = (args.find(a => a.startsWith('--region=')) || '').split('=')[1]
  || (args.includes('--region') ? args[args.indexOf('--region') + 1] : '')
const REGION_KEY = (regionArg || 'us').toLowerCase()

const preset = REGIONS[REGION_KEY]
if (!preset) {
  console.error(`Unknown --region "${REGION_KEY}". Use one of: ${Object.keys(REGIONS).join(', ')}.`)
  process.exit(1)
}

// Region-specific env wins, then generic env, then the preset default.
const RK = REGION_KEY.toUpperCase()
const env = (base) => process.env[`${base}_${RK}`] || process.env[base]
const ACCESS = env('AMAZON_ACCESS_KEY')
const SECRET = env('AMAZON_SECRET_KEY')
const TAG = process.env[`AMAZON_PARTNER_TAG_${RK}`] || process.env[`VITE_AMAZON_TAG_${RK}`]
  || process.env.AMAZON_PARTNER_TAG || process.env.VITE_AMAZON_AFFILIATE_TAG
const HOST = process.env.AMAZON_HOST || preset.host
const REGION = process.env.AMAZON_REGION || preset.region
const MARKETPLACE = process.env.AMAZON_MARKETPLACE || preset.marketplace
const SERVICE = 'ProductAdvertisingAPI'
const PATH = '/paapi5/searchitems'
const TARGET = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems'

if (!ACCESS || !SECRET || !TAG) {
  console.error(`Missing ${RK} credentials. Set AMAZON_ACCESS_KEY_${RK} / AMAZON_SECRET_KEY_${RK} (or the un-suffixed AMAZON_ACCESS_KEY / AMAZON_SECRET_KEY) and a partner tag (AMAZON_PARTNER_TAG_${RK} / VITE_AMAZON_TAG_${RK}).`)
  process.exit(1)
}
console.log(`Region: ${REGION_KEY} · ${MARKETPLACE} · tag ${TAG}`)

const OUT = new URL('../src/data/perfumeImages.json', import.meta.url)
let images = {}
try { images = JSON.parse(readFileSync(OUT, 'utf8')) } catch { /* start fresh */ }

const sleep = ms => new Promise(r => setTimeout(r, ms))
const sha256hex = s => crypto.createHash('sha256').update(s, 'utf8').digest('hex')
const hmac = (key, s) => crypto.createHmac('sha256', key).update(s, 'utf8').digest()

function sign(body, amzDate) {
  const dateStamp = amzDate.slice(0, 8)
  const headers = {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    host: HOST,
    'x-amz-date': amzDate,
    'x-amz-target': TARGET,
  }
  const signedHeaders = Object.keys(headers).sort().join(';')
  const canonicalHeaders = Object.keys(headers).sort().map(k => `${k}:${headers[k]}\n`).join('')
  const canonicalRequest = ['POST', PATH, '', canonicalHeaders, signedHeaders, sha256hex(body)].join('\n')
  const scope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256hex(canonicalRequest)].join('\n')
  const kDate = hmac('AWS4' + SECRET, dateStamp)
  const kRegion = hmac(kDate, REGION)
  const kService = hmac(kRegion, SERVICE)
  const kSigning = hmac(kService, 'aws4_request')
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex')
  return {
    ...headers,
    Authorization: `AWS4-HMAC-SHA256 Credential=${ACCESS}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  }
}

async function searchImage(keywords) {
  const body = JSON.stringify({
    Keywords: keywords,
    SearchIndex: 'Beauty',
    ItemCount: 1,
    PartnerTag: TAG,
    PartnerType: 'Associates',
    Marketplace: MARKETPLACE,
    Resources: ['Images.Primary.Large', 'ItemInfo.Title'],
  })
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')
  const headers = sign(body, amzDate)

  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://${HOST}${PATH}`, { method: 'POST', headers, body })
    if (res.status === 429 || res.status === 503) {
      const wait = 2000 * 2 ** attempt
      console.warn(`  throttled (${res.status}), waiting ${wait}ms…`)
      await sleep(wait)
      continue
    }
    const json = await res.json().catch(() => null)
    if (!res.ok) {
      const msg = json?.Errors?.[0]?.Message || `HTTP ${res.status}`
      return { error: msg }
    }
    const item = json?.SearchResult?.Items?.[0]
    const url = item?.Images?.Primary?.Large?.URL
    if (!url) return { error: 'no image in result' }
    return { image: url, title: item?.ItemInfo?.Title?.DisplayValue, asin: item?.ASIN }
  }
  return { error: 'throttled — gave up after retries' }
}

const jobs = []
for (const p of PERFUMES) {
  jobs.push({ key: String(p.id), q: `${p.designer} ${p.name} perfume` })
  if (DO_DUPES) jobs.push({ key: `dupe:${p.id}`, q: `${p.dupe.brand} ${p.dupe.name} perfume` })
}

let done = 0, ok = 0, fail = 0
for (const job of jobs) {
  done++
  if (!FORCE && images[job.key]?.image) { continue }
  process.stdout.write(`[${done}/${jobs.length}] ${job.q} … `)
  const r = await searchImage(job.q)
  if (r.image) {
    images[job.key] = { image: r.image, title: r.title, asin: r.asin, region: REGION_KEY }
    ok++
    console.log('ok')
    // save incrementally so a crash doesn't lose progress
    writeFileSync(OUT, JSON.stringify(images, null, 2) + '\n')
  } else {
    fail++
    console.log(`skip (${r.error})`)
  }
  await sleep(1200) // stay under PA-API's ~1 req/sec default limit
}

writeFileSync(OUT, JSON.stringify(images, null, 2) + '\n')
console.log(`\nDone. ${ok} fetched, ${fail} missing/failed. Written to src/data/perfumeImages.json`)
