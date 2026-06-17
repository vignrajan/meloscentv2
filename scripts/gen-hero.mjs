// Generates an on-brand editorial hero image for the
// "Best Summer Perfumes 2026" post — pure Node, no deps.
// Warm golden-hour palette matching Meloscent (#2C1810 / #C17F3A / #FAF3E8):
// a soft sun glow, an amber perfume bottle, citrus + leaves, film grain.
// Renders at 2x supersample then box-downsamples for smooth edges.

import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

const W = 1200, H = 675, SS = 2
const w = W * SS, h = H * SS
const buf = new Uint8Array(w * h * 3)

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t) }

function set(x, y, r, g, b) {
  const i = (y * w + x) * 3
  buf[i] = clamp(r, 0, 255); buf[i + 1] = clamp(g, 0, 255); buf[i + 2] = clamp(b, 0, 255)
}
function get(x, y) { const i = (y * w + x) * 3; return [buf[i], buf[i + 1], buf[i + 2]] }
function blend(x, y, r, g, b, a) {
  if (a <= 0 || x < 0 || y < 0 || x >= w || y >= h) return
  const [br, bg, bb] = get(x, y)
  set(x, y, lerp(br, r, a), lerp(bg, g, a), lerp(bb, b, a))
}

// ---- Background: warm vertical gradient + radial sun glow ----
const stops = [
  [0.00, [250, 238, 220]], // cream sky
  [0.42, [233, 196, 142]], // hazy gold
  [0.70, [193, 127, 58]],  // copper
  [1.00, [120, 66, 28]],   // warm terracotta shadow
]
function gradAt(t) {
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1], [t1, c1] = stops[i]
      const k = (t - t0) / (t1 - t0)
      return [lerp(c0[0], c1[0], k), lerp(c0[1], c1[1], k), lerp(c0[2], c1[2], k)]
    }
  }
  return stops[stops.length - 1][1]
}
// Sun centre upper-right, leaving negative space on the left
const sunX = w * 0.74, sunY = h * 0.30, sunR = w * 0.16
for (let y = 0; y < h; y++) {
  const [gr, gg, gb] = gradAt(y / h)
  for (let x = 0; x < w; x++) {
    set(x, y, gr, gg, gb)
    const d = Math.hypot(x - sunX, y - sunY)
    const glow = Math.exp(-(d * d) / (2 * (sunR * 1.9) ** 2)) // soft falloff
    if (glow > 0.002) blend(x, y, 255, 246, 214, glow * 0.85)
    const core = 1 - smooth(sunR * 0.55, sunR, d)              // bright sun disc
    if (core > 0) blend(x, y, 255, 250, 232, core * 0.9)
  }
}

// ---- Horizon haze band (sun-bleached travertine surface) ----
for (let y = 0; y < h; y++) {
  const band = (1 - smooth(h * 0.60, h * 0.66, y)) * smooth(h * 0.58, h * 0.62, y)
  if (band > 0) for (let x = 0; x < w; x++) blend(x, y, 240, 224, 196, band * 0.5)
}

// ---- Soft long shadow cast across the surface ----
for (let y = h * 0.62 | 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const sh = smooth(w * 0.50, w * 0.80, x) * (1 - smooth(h * 0.62, h, y) * 0.6)
    if (sh > 0) blend(x, y, 90, 50, 22, sh * 0.18)
  }
}

// ---- Perfume bottle (right of centre), translucent amber ----
function roundRectCoverage(px, py, x0, y0, x1, y1, rad) {
  const cx = clamp(px, x0 + rad, x1 - rad)
  const cy = clamp(py, y0 + rad, y1 - rad)
  const d = Math.hypot(px - cx, py - cy) - rad
  return 1 - smooth(-1.2, 1.2, d)
}
const bx = w * 0.605, bw = w * 0.150
const byTop = h * 0.345, byBot = h * 0.70
// body
for (let y = byTop | 0; y <= byBot; y++) {
  for (let x = (bx - bw / 2) | 0; x <= bx + bw / 2; x++) {
    const cov = roundRectCoverage(x, y, bx - bw / 2, byTop, bx + bw / 2, byBot, w * 0.022)
    if (cov <= 0) continue
    // amber glass: depth shading + vertical highlight
    const u = (x - (bx - bw / 2)) / bw
    const shade = 0.78 + 0.30 * Math.exp(-((u - 0.32) ** 2) / 0.05) // highlight stripe
    blend(x, y, clamp(196 * shade, 0, 255), clamp(126 * shade, 0, 255), clamp(58 * shade, 0, 255), cov * 0.86)
    // liquid line lighter near top
    const liq = smooth(byTop, byTop + bw * 0.5, y)
    blend(x, y, 244, 206, 140, cov * 0.10 * (1 - liq))
  }
}
// neck + cap
const nx = bx, nw = bw * 0.34, neckTop = h * 0.275, neckBot = byTop + 2
for (let y = neckTop | 0; y <= neckBot; y++)
  for (let x = (nx - nw / 2) | 0; x <= nx + nw / 2; x++) {
    const cov = roundRectCoverage(x, y, nx - nw / 2, neckTop, nx + nw / 2, neckBot + 6, w * 0.006)
    if (cov > 0) blend(x, y, 150, 96, 44, cov * 0.9)
  }
const capTop = h * 0.205, capBot = neckTop + 4, cw = bw * 0.46
for (let y = capTop | 0; y <= capBot; y++)
  for (let x = (nx - cw / 2) | 0; x <= nx + cw / 2; x++) {
    const cov = roundRectCoverage(x, y, nx - cw / 2, capTop, nx + cw / 2, capBot, w * 0.010)
    if (cov > 0) {
      const u = (x - (nx - cw / 2)) / cw
      const shade = 0.85 + 0.5 * Math.exp(-((u - 0.3) ** 2) / 0.06)
      blend(x, y, clamp(60 * shade, 0, 255), clamp(40 * shade, 0, 255), clamp(24 * shade, 0, 255), cov)
    }
  }

// ---- Citrus + leaves, lower-left foreground ----
function disc(cx, cy, r, fill, edge) {
  for (let y = (cy - r - 2) | 0; y <= cy + r + 2; y++)
    for (let x = (cx - r - 2) | 0; x <= cx + r + 2; x++) {
      const d = Math.hypot(x - cx, y - cy)
      const cov = 1 - smooth(r - 1.4, r + 1.4, d)
      if (cov <= 0) continue
      const ring = 1 - smooth(r * 0.80, r * 0.92, d)        // rind
      const fr = lerp(edge[0], fill[0], ring)
      const fg = lerp(edge[1], fill[1], ring)
      const fb = lerp(edge[2], fill[2], ring)
      blend(x, y, fr, fg, fb, cov)
      // pulp sheen
      blend(x, y, 255, 248, 214, cov * 0.18 * Math.exp(-((d) ** 2) / (2 * (r * 0.5) ** 2)))
    }
}
function leaf(cx, cy, rx, ry, ang) {
  const ca = Math.cos(ang), sa = Math.sin(ang)
  for (let y = (cy - ry - rx) | 0; y <= cy + ry + rx; y++)
    for (let x = (cx - ry - rx) | 0; x <= cx + ry + rx; x++) {
      const dx = x - cx, dy = y - cy
      const lx = dx * ca + dy * sa, ly = -dx * sa + dy * ca
      const d = (lx * lx) / (rx * rx) + (ly * ly) / (ry * ry)
      const cov = 1 - smooth(0.85, 1.15, d)
      if (cov > 0) blend(x, y, 92, 132, 70, cov * 0.92)
    }
}
leaf(w * 0.20, h * 0.80, w * 0.052, w * 0.020, 0.5)
leaf(w * 0.30, h * 0.86, w * 0.060, w * 0.022, -0.35)
disc(w * 0.155, h * 0.835, w * 0.060, [247, 206, 86], [232, 158, 52])  // lemon
disc(w * 0.275, h * 0.885, w * 0.050, [245, 178, 70], [212, 120, 40])  // orange
disc(w * 0.235, h * 0.795, w * 0.034, [250, 224, 120], [225, 168, 70]) // small slice

// ---- Film grain ----
let seed = 1337
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    const n = (rnd() - 0.5) * 5
    const i = (y * w + x) * 3
    buf[i] = clamp(buf[i] + n, 0, 255); buf[i + 1] = clamp(buf[i + 1] + n, 0, 255); buf[i + 2] = clamp(buf[i + 2] + n, 0, 255)
  }

// ---- Downsample SSxSS -> final, write PNG ----
const out = Buffer.alloc(H * (1 + W * 3))
for (let Y = 0; Y < H; Y++) {
  out[Y * (1 + W * 3)] = 0 // filter: none
  for (let X = 0; X < W; X++) {
    let r = 0, g = 0, b = 0
    for (let dy = 0; dy < SS; dy++)
      for (let dx = 0; dx < SS; dx++) {
        const i = ((Y * SS + dy) * w + (X * SS + dx)) * 3
        r += buf[i]; g += buf[i + 1]; b += buf[i + 2]
      }
    const n = SS * SS, o = Y * (1 + W * 3) + 1 + X * 3
    out[o] = (r / n) | 0; out[o + 1] = (g / n) | 0; out[o + 2] = (b / n) | 0
  }
}

function crc32(b) {
  let c = ~0
  for (let i = 0; i < b.length; i++) {
    c ^= b[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1))
  }
  return ~c >>> 0
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])))
  return Buffer.concat([len, t, data, crc])
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(out, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
])
mkdirSync(new URL('../public/blog', import.meta.url), { recursive: true })
const dest = new URL('../public/blog/best-summer-perfumes-2026-hero.png', import.meta.url)
writeFileSync(dest, png)
console.log('Wrote', dest.pathname, (png.length / 1024).toFixed(1) + 'KB', `${W}x${H}`)
