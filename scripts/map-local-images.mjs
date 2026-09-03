/**
 * Map local perfume images to catalog entries.
 *
 * 1. Drop your image files into  public/perfumes/
 * 2. Name each file by the perfume's id (e.g. 2.jpg, 14.png) OR by its name
 *    (e.g. "Creed Aventus.jpg", "aventus.webp") — matching is case/space
 *    insensitive.
 * 3. Run:  npm run map-images
 *
 * It writes/merges src/data/perfumeImages.json (id -> "/perfumes/<file>"), which
 * the cards read automatically (with the gradient as fallback where no image
 * exists). Re-run any time you add more images. Supported: jpg, jpeg, png,
 * webp, avif, gif.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { PERFUMES } from '../src/data/perfumes.js'

const DIR = new URL('../public/perfumes/', import.meta.url)
const OUT = new URL('../src/data/perfumeImages.json', import.meta.url)
const EXT = /\.(jpe?g|png|webp|avif|gif)$/i
const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

// Lookup tables: by id, and by normalized "designer name" / "name".
const byId = new Map(PERFUMES.map(p => [String(p.id), p]))
const byName = new Map()
for (const p of PERFUMES) {
  byName.set(norm(`${p.designer} ${p.name}`), p)
  byName.set(norm(p.name), p)
}

mkdirSync(DIR, { recursive: true })
const files = readdirSync(DIR).filter(f => EXT.test(f))

let images = {}
try { images = JSON.parse(readFileSync(OUT, 'utf8')) } catch { /* start fresh */ }

const matched = [], unmatched = []
for (const f of files) {
  const base = f.replace(EXT, '')
  const p = byId.get(base.trim()) || byName.get(norm(base))
  if (p) {
    images[String(p.id)] = { image: `/perfumes/${f}`, source: 'local' }
    matched.push([p.id, `${p.designer} ${p.name}`, f])
  } else {
    unmatched.push(f)
  }
}

writeFileSync(OUT, JSON.stringify(images, null, 2) + '\n')

if (matched.length) {
  console.log(`Mapped ${matched.length} image(s):`)
  matched.sort((a, b) => a[0] - b[0]).forEach(([id, name, f]) => console.log(`  #${id}  ${name}  ←  ${f}`))
}
if (unmatched.length) {
  console.log(`\n⚠ ${unmatched.length} file(s) didn't match a perfume — rename to its id or "Designer Name":`)
  unmatched.forEach(f => console.log(`  ${f}`))
}
const have = PERFUMES.filter(p => images[String(p.id)]).length
console.log(`\n${have}/${PERFUMES.length} perfumes now have an image. Wrote src/data/perfumeImages.json`)

if (!files.length) {
  console.log('\n(No image files found in public/perfumes/ yet — add some and re-run.)')
  console.log('Reference — id : perfume:')
  PERFUMES.forEach(p => console.log(`  ${String(p.id).padStart(2)} : ${p.designer} ${p.name}`))
}
