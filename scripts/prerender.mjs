// Build-time prerenderer.
// After `vite build`, this emits a real, crawlable HTML page for every blog
// post at dist/blog/<slug>/index.html — with the full article text, per-post
// meta/OG/canonical tags, and Article + Breadcrumb + FAQPage JSON-LD baked
// into the served HTML. This is what makes the posts eligible for Google
// indexing and Discover; the SPA still boots and takes over #root on load.
//
// It also regenerates dist/sitemap.xml with the real post URLs.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { BLOGS } from '../src/data/blogs.js'
import { buildArticleSchema, buildFaqSchema, buildBreadcrumbSchema, postUrl } from '../src/utils/structuredData.js'

const SITE = 'https://www.meloscent.com'
const DIST = new URL('../dist/', import.meta.url)
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const attr = s => esc(s).replace(/'/g, '&#39;')
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const fmtDate = d => { const [y, m, day] = String(d).split('-').map(Number); return `${MONTHS[m - 1]} ${day}, ${y}` }

// Static href for an internal link block (crawlable anchors)
function linkHref(link) {
  if (!link) return '/'
  if (link.kind === 'blog') return `/blog/${link.value}`
  if (link.kind === 'note') return `/?note=${encodeURIComponent(link.value)}`
  if (link.kind === 'search') return `/?q=${encodeURIComponent(link.value)}`
  return '/'
}

function notesRow(label, items) {
  if (!items?.length) return ''
  const pills = items.map(n => `<span class="npill" style="background:rgba(193,127,58,.1);color:#8b5a1a">${esc(n)}</span>`).join('')
  return `<div style="display:flex;gap:10px;align-items:baseline;margin-bottom:6px;flex-wrap:wrap"><span style="font-size:10px;font-family:'DM Sans',sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#C17F3A;min-width:46px">${label}</span><span style="display:flex;flex-wrap:wrap">${pills}</span></div>`
}

function renderBlock(b) {
  switch (b.type) {
    case 'callout':
      return `<div class="blog-callout" role="note"><span aria-hidden="true" style="color:#C17F3A">✦</span><span>${esc(b.text)}</span></div>`
    case 'h2':
      return `<h2 id="${attr(slugify(b.text))}" class="blog-h2">${esc(b.text)}</h2>`
    case 'p':
      return `<p class="blog-p">${esc(b.text)}</p>`
    case 'tldr':
      return `<aside class="blog-tldr" aria-label="${attr(b.title || 'Summary')}">${b.title ? `<div class="blog-tldr-title">${esc(b.title)}</div>` : ''}<ul>${b.items.map(it => `<li><strong>${esc(it.label)}:</strong> ${esc(it.text)}</li>`).join('')}</ul></aside>`
    case 'perfume': {
      const notes = b.notes ? `<div class="blog-notes">${notesRow('Top', b.notes.top)}${notesRow('Heart', b.notes.mid)}${notesRow('Base', b.notes.base)}</div>` : ''
      const rating = b.rating ? `<span class="blog-rating" aria-label="Rating ${attr(b.rating)}">★ ${esc(b.rating)}</span>` : ''
      const specs = Array.isArray(b.specs) && b.specs.length
        ? `<dl class="blog-specs">${b.specs.map(s => `<div class="blog-spec"><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('')}</dl>` : ''
      const pros = b.pros?.length ? `<ul class="blog-pros">${b.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''
      const cons = b.cons?.length ? `<ul class="blog-cons">${b.cons.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''
      const proscons = (b.pros?.length || b.cons?.length) ? `<div class="blog-proscons">${pros}${cons}</div>` : ''
      const verdict = b.verdict ? `<p class="blog-verdict"><strong>Verdict:</strong> ${esc(b.verdict)}</p>` : ''
      const link = b.link ? `<a class="blog-ilink" href="${attr(linkHref(b.link))}">${esc(b.link.label)}</a>` : ''
      return `<article class="blog-perfume"><div class="blog-perfume-head"><span class="blog-perfume-rank" aria-hidden="true">${b.rank}</span><div style="flex:1"><h3 class="blog-perfume-name">${esc(b.name)} <span class="blog-perfume-brand">${esc(b.brand)}</span></h3>${b.bestFor ? `<span class="blog-bestfor">${esc(b.bestFor)}</span>` : ''}</div>${rating}</div><p class="blog-p" style="margin-bottom:14px">${esc(b.blurb)}</p>${notes}${specs}${proscons}${verdict}${link}</article>`
    }
    case 'table': {
      const head = b.headers ? `<thead><tr>${b.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>` : ''
      const body = `<tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>`
      return `<div class="blog-table-wrap">${b.caption ? `<div class="blog-table-caption">${esc(b.caption)}</div>` : ''}<div class="blog-table-scroll"><table class="blog-table">${head}${body}</table></div></div>`
    }
    case 'tips':
      return `<div class="blog-tips">${b.items.map(it => `<div class="blog-tip"><div class="blog-tip-title">${esc(it.title)}</div><p class="blog-p" style="margin-bottom:0">${esc(it.text)}</p></div>`).join('')}</div>`
    case 'faq':
      return `<div class="blog-faq">${b.items.map(it => `<details class="blog-faq-item"><summary>${esc(it.q)}</summary><p class="blog-p" style="margin:10px 0 0">${esc(it.a)}</p></details>`).join('')}</div>`
    case 'related':
      return `<nav class="blog-related" aria-label="${attr(b.title || 'Related reading')}">${b.title ? `<div class="blog-related-title">${esc(b.title)}</div>` : ''}<ul>${b.items.map(it => `<li><a class="blog-related-link" href="${attr(linkHref(it))}">${esc(it.label)}</a></li>`).join('')}</ul></nav>`
    default:
      return ''
  }
}

function renderArticle(post) {
  const hero = post.heroImage
    ? `<figure class="blog-hero-img" style="margin-top:24px"><img src="${attr(post.heroImage)}" alt="${attr(post.heroAlt || post.title)}" width="1200" height="675"/><figcaption><span class="blog-hero-chip">${esc(post.category)}</span><h1 class="blog-hero-h1">${esc(post.title)}</h1></figcaption></figure>`
    : `<div style="border-radius:24px;margin-top:24px;background:${attr(post.gradient)};min-height:220px;display:flex;flex-direction:column;justify-content:flex-end;padding:40px 48px"><h1 style="color:#fff;font-family:'Playfair Display',serif">${esc(post.title)}</h1></div>`

  const dates = [
    post.datePublished ? `<time datetime="${attr(post.datePublished)}">Published ${esc(fmtDate(post.datePublished))}</time>` : '',
    post.dateModified && post.dateModified !== post.datePublished ? `<time datetime="${attr(post.dateModified)}"> · Updated ${esc(fmtDate(post.dateModified))}</time>` : '',
  ].join('')
  const tags = Array.isArray(post.tags) ? `<div class="blog-tags">${post.tags.map(t => `<span class="blog-tag">${esc(t)}</span>`).join('')}</div>` : ''
  const byline = `<div class="blog-byline"><div class="blog-byline-row"><span class="blog-byline-author">By ${esc(post.author || 'Meloscent')}${post.authorRole ? `<span class="blog-byline-role"> · ${esc(post.authorRole)}</span>` : ''}</span><span class="blog-byline-meta">${esc(post.readTime || '')}</span></div><div class="blog-byline-dates">${dates}</div>${tags}</div>`

  const bodyHtml = Array.isArray(post.body)
    ? post.body.map(renderBlock).join('')
    : (post.content || []).map(p => `<p class="blog-p">${esc(p)}</p>`).join('')

  const authorCard = post.author && post.authorBio
    ? `<aside class="blog-author-card" aria-label="About the author"><div class="blog-author-avatar" aria-hidden="true">${esc(post.author.trim().charAt(0))}</div><div><div class="blog-author-name">${esc(post.author)}</div>${post.authorRole ? `<div class="blog-author-role">${esc(post.authorRole)}</div>` : ''}<p class="blog-author-bio">${esc(post.authorBio)}</p></div></aside>`
    : ''

  // Cross-links to other posts help crawl the internal link graph.
  const others = BLOGS.filter(b => b.id !== post.id && b.slug).slice(0, 3)
  const more = others.length
    ? `<nav class="blog-related" aria-label="More from the Journal" style="margin-top:40px"><div class="blog-related-title">More from the Journal</div><ul>${others.map(b => `<li><a class="blog-related-link" href="/blog/${attr(b.slug)}">${esc(b.title)}</a></li>`).join('')}</ul></nav>`
    : ''

  return `<main style="max-width:1400px;margin:0 auto;padding:0 24px 88px">${hero}<div style="max-width:720px;margin:40px auto 0">${byline}<p style="font-size:18px;font-family:'Playfair Display',serif;font-style:italic;color:rgba(44,24,16,.65);line-height:1.75;margin:28px 0 36px;border-left:3px solid #C17F3A;padding-left:20px">${esc(post.excerpt)}</p>${bodyHtml}${authorCard}${more}</div></main>`
}

// ── Head/meta rewriting ───────────────────────────────────────
function setMetaContent(html, key, val) {
  const k = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(<meta[^>]*\\b${k}[^>]*\\scontent=")[^"]*(")`, 'i')
  return html.replace(re, (_, a, b) => a + attr(val) + b)
}
function setTitle(html, val) { return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(val)}</title>`) }
function setCanonical(html, url) { return html.replace(/(<link rel="canonical" href=")[^"]*(")/i, (_, a, b) => a + attr(url) + b) }

function buildPage(template, post) {
  const url = postUrl(post)
  const img = post.heroImage ? `${SITE}${post.heroImage}` : `${SITE}/og.png`
  const title = post.metaTitle || `${post.title} — Meloscent`
  const desc = post.metaDescription || post.excerpt

  let html = template
  html = setTitle(html, title)
  html = setMetaContent(html, 'name="description"', desc)
  html = setCanonical(html, url)
  html = setMetaContent(html, 'property="og:type"', 'article')
  html = setMetaContent(html, 'property="og:url"', url)
  html = setMetaContent(html, 'property="og:title"', post.metaTitle || post.title)
  html = setMetaContent(html, 'property="og:description"', desc)
  html = setMetaContent(html, 'property="og:image"', img)
  html = setMetaContent(html, 'name="twitter:title"', post.metaTitle || post.title)
  html = setMetaContent(html, 'name="twitter:description"', desc)
  html = setMetaContent(html, 'name="twitter:image"', img)

  const schemas = [buildArticleSchema(post), buildBreadcrumbSchema(post)]
  const faq = Array.isArray(post.body) && post.body.find(b => b.type === 'faq')
  if (faq) schemas.push(buildFaqSchema(faq.items))
  const jsonld = schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')
  html = html.replace('</head>', `${jsonld}\n</head>`)

  // Bake the article into #root so it's in the initial HTML response.
  html = html.replace('<div id="root"></div>', `<div id="root">${renderArticle(post)}</div>`)
  return html
}

// ── Run ───────────────────────────────────────────────────────
const template = readFileSync(new URL('index.html', DIST), 'utf8')
const posts = BLOGS.filter(b => b.slug)
let count = 0
for (const post of posts) {
  const dir = new URL(`blog/${post.slug}/`, DIST)
  mkdirSync(dir, { recursive: true })
  writeFileSync(new URL('index.html', dir), buildPage(template, post))
  count++
}

// Regenerate sitemap with real URLs (+ image for the hero post).
const urls = [
  `  <url>\n    <loc>${SITE}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n    <lastmod>2026-06-17</lastmod>\n  </url>`,
  ...posts.map(p => {
    const img = p.heroImage
      ? `\n    <image:image>\n      <image:loc>${SITE}${p.heroImage}</image:loc>\n      <image:title>${esc(p.title)}</image:title>\n    </image:image>`
      : ''
    const lastmod = p.dateModified || p.datePublished || '2026-06-17'
    const priority = p.body ? '0.9' : '0.7'
    return `  <url>\n    <loc>${SITE}/blog/${p.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n    <lastmod>${lastmod}</lastmod>${img}\n  </url>`
  }),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`
writeFileSync(new URL('sitemap.xml', DIST), sitemap)

// RSS feed — powers feed readers and Chrome's "Follow" (a Discover-adjacent surface).
const rfc822 = d => { const [y, m, day] = String(d).split('-').map(Number); return new Date(Date.UTC(y, m - 1, day, 9)).toUTCString() }
const items = posts.map(p => {
  const link = `${SITE}/blog/${p.slug}`
  const enclosure = p.heroImage ? `\n      <enclosure url="${SITE}${p.heroImage}" type="image/png" length="0"/>` : ''
  return `    <item>\n      <title>${esc(p.metaTitle || p.title)}</title>\n      <link>${link}</link>\n      <guid isPermaLink="true">${link}</guid>\n      <description>${esc(p.metaDescription || p.excerpt)}</description>\n      <category>${esc(p.category)}</category>\n      <pubDate>${rfc822(p.datePublished || '2026-05-26')}</pubDate>${enclosure}\n    </item>`
}).join('\n')
const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>Meloscent · The Journal</title>\n    <link>${SITE}/</link>\n    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>\n    <description>Fragrance guides, reviews, and seasonal edits from Meloscent.</description>\n    <language>en-us</language>\n${items}\n  </channel>\n</rss>\n`
writeFileSync(new URL('rss.xml', DIST), rss)

console.log(`Prerendered ${count} blog page(s) + sitemap.xml + rss.xml`)
