// Editorial hero for the "Best Clone Fragrances 2026" roundup — pure Node.
// A lineup of bottles of varying heights and tints under a warm spotlight,
// on a dark reflective surface. On-brand copper/cream accents. 16:9, grain,
// 2x supersample -> box downsample for smooth edges.

import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

const W = 1200, H = 675, SS = 2
const w = W * SS, h = H * SS
const buf = new Uint8Array(w * h * 3)

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t) }
const set = (x, y, r, g, b) => { const i = (y * w + x) * 3; buf[i] = clamp(r, 0, 255); buf[i + 1] = clamp(g, 0, 255); buf[i + 2] = clamp(b, 0, 255) }
const get = (x, y) => { const i = (y * w + x) * 3; return [buf[i], buf[i + 1], buf[i + 2]] }
function blend(x, y, r, g, b, a) {
  if (a <= 0 || x < 0 || y < 0 || x >= w || y >= h) return
  const [br, bg, bb] = get(x, y)
  set(x, y, lerp(br, r, a), lerp(bg, g, a), lerp(bb, b, a))
}

// ── Background: deep warm brown vignette + spotlight ──
const horizon = h * 0.66
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    let r, g, b
    if (y < horizon) { const t = y / horizon; r = lerp(28, 74, t); g = lerp(16, 42, t); b = lerp(10, 22, t) } // wall
    else { const t = (y - horizon) / (h - horizon); r = lerp(40, 16, t); g = lerp(24, 9, t); b = lerp(14, 6, t) } // table
    set(x, y, r, g, b)
  }
}
// warm spotlight behind the lineup
const sx = w * 0.5, sy = h * 0.30, sr = w * 0.30
for (let y = 0; y < horizon; y++) for (let x = 0; x < w; x++) {
  const d = Math.hypot((x - sx) * 0.8, y - sy)
  const glow = Math.exp(-(d * d) / (2 * (sr * 1.2) ** 2))
  if (glow > 0.004) blend(x, y, 214, 150, 74, glow * 0.5)
}

// rounded-rect coverage
function rr(px, py, x0, y0, x1, y1, rad) {
  const cx = clamp(px, x0 + rad, x1 - rad), cy = clamp(py, y0 + rad, y1 - rad)
  return 1 - smooth(-1.2, 1.2, Math.hypot(px - cx, py - cy) - rad)
}

// ── Bottles ──
// tint = [r,g,b]; each drawn as body + shoulder + cap + highlight + reflection
const baseY = horizon + h * 0.02
const bottles = [
  { cx: 0.155, bw: 0.115, bh: 0.30, tint: [46, 96, 120], cap: [20, 30, 38] },   // teal
  { cx: 0.320, bw: 0.130, bh: 0.40, tint: [150, 60, 44], cap: [60, 22, 18] },    // deep red
  { cx: 0.500, bw: 0.150, bh: 0.50, tint: [196, 132, 60], cap: [40, 26, 14] },   // amber (tallest, centre)
  { cx: 0.680, bw: 0.130, bh: 0.38, tint: [70, 110, 70], cap: [26, 40, 26] },    // green
  { cx: 0.840, bw: 0.115, bh: 0.33, tint: [206, 172, 92], cap: [48, 34, 16] },   // gold
]

for (const bt of bottles) {
  const cx = w * bt.cx, bw = w * bt.bw
  const top = baseY - h * bt.bh, bot = baseY
  const x0 = cx - bw / 2, x1 = cx + bw / 2
  // reflection on the table (below baseY, fading)
  for (let y = bot | 0; y < Math.min(h, bot + h * bt.bh * 0.4); y++) {
    const mirror = bot - (y - bot) / 0.4
    if (mirror < top) continue
    for (let x = x0 | 0; x <= x1; x++) {
      const cov = rr(x, mirror, x0, top, x1, bot, w * 0.02)
      const fade = (1 - (y - bot) / (h * bt.bh * 0.4)) * 0.22
      if (cov > 0) blend(x, y, bt.tint[0], bt.tint[1], bt.tint[2], cov * fade)
    }
  }
  // body
  for (let y = top | 0; y <= bot; y++) for (let x = x0 | 0; x <= x1; x++) {
    const cov = rr(x, y, x0, top, x1, bot, w * 0.02)
    if (cov <= 0) continue
    const u = (x - x0) / bw
    const shade = 0.66 + 0.5 * Math.exp(-((u - 0.30) ** 2) / 0.05) // highlight
    blend(x, y, bt.tint[0] * shade, bt.tint[1] * shade, bt.tint[2] * shade, cov * 0.92)
    // liquid gradient darker at bottom
    const dk = smooth(top, bot, y) * 0.14
    blend(x, y, bt.tint[0] * 0.5, bt.tint[1] * 0.5, bt.tint[2] * 0.5, cov * dk)
    // rim light on right edge
    if (u > 0.82) blend(x, y, 240, 200, 150, cov * (u - 0.82) / 0.18 * 0.5)
  }
  // neck + cap
  const nw = bw * 0.34, neckTop = top - h * 0.045
  for (let y = neckTop | 0; y <= top + 4; y++) for (let x = (cx - nw / 2) | 0; x <= cx + nw / 2; x++) {
    const cov = rr(x, y, cx - nw / 2, neckTop, cx + nw / 2, top + 6, w * 0.005)
    if (cov > 0) blend(x, y, bt.tint[0] * 0.7, bt.tint[1] * 0.7, bt.tint[2] * 0.7, cov * 0.9)
  }
  const cw = bw * 0.44, capTop = neckTop - h * 0.05
  for (let y = capTop | 0; y <= neckTop + 3; y++) for (let x = (cx - cw / 2) | 0; x <= cx + cw / 2; x++) {
    const cov = rr(x, y, cx - cw / 2, capTop, cx + cw / 2, neckTop + 3, w * 0.008)
    if (cov > 0) { const u = (x - (cx - cw / 2)) / cw; const s = 0.8 + 0.5 * Math.exp(-((u - 0.3) ** 2) / 0.06); blend(x, y, bt.cap[0] * s, bt.cap[1] * s, bt.cap[2] * s, cov) }
  }
}

// soft floor contact shadows
for (let y = baseY | 0; y < Math.min(h, baseY + h * 0.05); y++) for (const bt of bottles) {
  const cx = w * bt.cx, bw = w * bt.bw
  for (let x = (cx - bw * 0.7) | 0; x <= cx + bw * 0.7; x++) {
    const d = Math.abs(x - cx) / (bw * 0.7), vy = (y - baseY) / (h * 0.05)
    blend(x, y, 0, 0, 0, (1 - d) * (1 - vy) * 0.25)
  }
}

// ── Grain ──
let seed = 20260117
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const n = (rnd() - 0.5) * 5, i = (y * w + x) * 3
  buf[i] = clamp(buf[i] + n, 0, 255); buf[i + 1] = clamp(buf[i + 1] + n, 0, 255); buf[i + 2] = clamp(buf[i + 2] + n, 0, 255)
}

// ── Downsample + PNG encode ──
const out = Buffer.alloc(H * (1 + W * 3))
for (let Y = 0; Y < H; Y++) {
  out[Y * (1 + W * 3)] = 0
  for (let X = 0; X < W; X++) {
    let r = 0, g = 0, b = 0
    for (let dy = 0; dy < SS; dy++) for (let dx = 0; dx < SS; dx++) { const i = ((Y * SS + dy) * w + (X * SS + dx)) * 3; r += buf[i]; g += buf[i + 1]; b += buf[i + 2] }
    const n = SS * SS, o = Y * (1 + W * 3) + 1 + X * 3
    out[o] = (r / n) | 0; out[o + 1] = (g / n) | 0; out[o + 2] = (b / n) | 0
  }
}
function crc32(b) { let c = ~0; for (let i = 0; i < b.length; i++) { c ^= b[i]; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)) } return ~c >>> 0 }
function chunk(type, data) { const t = Buffer.from(type, 'ascii'); const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data]))); return Buffer.concat([len, t, data, crc]) }
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(out, { level: 9 })), chunk('IEND', Buffer.alloc(0))])
mkdirSync(new URL('../public/blog', import.meta.url), { recursive: true })
const dest = new URL('../public/blog/best-clone-fragrances-2026-hero.png', import.meta.url)
writeFileSync(dest, png)
console.log('Wrote', dest.pathname, (png.length / 1024).toFixed(1) + 'KB')
