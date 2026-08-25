// Hero for "Lattafa Ramz Silver vs Gold" — pure Node, no deps.
// Split background (cool left / warm right) with two bottles facing off:
// a cool silver-toned bottle and a warm gold-toned bottle, spotlit on a dark
// reflective surface. 16:9, grain, 2x supersample -> box downsample.

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

const horizon = h * 0.66
// Split background: cool grey-blue (left) → warm gold-brown (right)
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const side = smooth(w * 0.38, w * 0.62, x) // 0 = cool, 1 = warm
    const vy = y < horizon ? y / horizon : 1
    // cool wall/table
    const cool = [lerp(44, 60, vy), lerp(52, 66, vy), lerp(60, 74, vy)]
    const warm = [lerp(70, 92, vy), lerp(44, 54, vy), lerp(22, 26, vy)]
    let r = lerp(cool[0], warm[0], side), g = lerp(cool[1], warm[1], side), b = lerp(cool[2], warm[2], side)
    if (y >= horizon) { const t = (y - horizon) / (h - horizon); r *= lerp(1, 0.3, t); g *= lerp(1, 0.3, t); b *= lerp(1, 0.3, t) }
    set(x, y, r, g, b)
  }
}
// two spotlights
for (const [sx, tint] of [[0.34, [150, 168, 190]], [0.66, [220, 160, 80]]]) {
  const cx = w * sx, cy = h * 0.30, sr = w * 0.22
  for (let y = 0; y < horizon; y++) for (let x = 0; x < w; x++) {
    const d = Math.hypot((x - cx) * 0.85, y - cy)
    const glow = Math.exp(-(d * d) / (2 * (sr * 1.25) ** 2))
    if (glow > 0.004) blend(x, y, tint[0], tint[1], tint[2], glow * 0.4)
  }
}

function rr(px, py, x0, y0, x1, y1, rad) {
  const cx = clamp(px, x0 + rad, x1 - rad), cy = clamp(py, y0 + rad, y1 - rad)
  return 1 - smooth(-1.2, 1.2, Math.hypot(px - cx, py - cy) - rad)
}

const baseY = horizon + h * 0.02
const bottles = [
  { cx: 0.34, bw: 0.16, bh: 0.46, tint: [176, 186, 198], cap: [60, 66, 74] },  // silver
  { cx: 0.66, bw: 0.16, bh: 0.46, tint: [206, 166, 82], cap: [46, 32, 14] },   // gold
]
for (const bt of bottles) {
  const cx = w * bt.cx, bw = w * bt.bw
  const top = baseY - h * bt.bh, bot = baseY
  const x0 = cx - bw / 2, x1 = cx + bw / 2
  // reflection
  for (let y = bot | 0; y < Math.min(h, bot + h * bt.bh * 0.4); y++) {
    const mirror = bot - (y - bot) / 0.4
    if (mirror < top) continue
    for (let x = x0 | 0; x <= x1; x++) {
      const cov = rr(x, mirror, x0, top, x1, bot, w * 0.022)
      const fade = (1 - (y - bot) / (h * bt.bh * 0.4)) * 0.22
      if (cov > 0) blend(x, y, bt.tint[0], bt.tint[1], bt.tint[2], cov * fade)
    }
  }
  // body
  for (let y = top | 0; y <= bot; y++) for (let x = x0 | 0; x <= x1; x++) {
    const cov = rr(x, y, x0, top, x1, bot, w * 0.022)
    if (cov <= 0) continue
    const u = (x - x0) / bw
    const shade = 0.64 + 0.55 * Math.exp(-((u - 0.30) ** 2) / 0.05)
    blend(x, y, bt.tint[0] * shade, bt.tint[1] * shade, bt.tint[2] * shade, cov * 0.94)
    const dk = smooth(top, bot, y) * 0.12
    blend(x, y, bt.tint[0] * 0.5, bt.tint[1] * 0.5, bt.tint[2] * 0.5, cov * dk)
    if (u > 0.82) blend(x, y, 250, 250, 250, cov * (u - 0.82) / 0.18 * 0.45)
  }
  // neck + cap
  const nw = bw * 0.32, neckTop = top - h * 0.05
  for (let y = neckTop | 0; y <= top + 4; y++) for (let x = (cx - nw / 2) | 0; x <= cx + nw / 2; x++) {
    const cov = rr(x, y, cx - nw / 2, neckTop, cx + nw / 2, top + 6, w * 0.005)
    if (cov > 0) blend(x, y, bt.tint[0] * 0.7, bt.tint[1] * 0.7, bt.tint[2] * 0.7, cov * 0.9)
  }
  const cw = bw * 0.42, capTop = neckTop - h * 0.055
  for (let y = capTop | 0; y <= neckTop + 3; y++) for (let x = (cx - cw / 2) | 0; x <= cx + cw / 2; x++) {
    const cov = rr(x, y, cx - cw / 2, capTop, cx + cw / 2, neckTop + 3, w * 0.008)
    if (cov > 0) { const u = (x - (cx - cw / 2)) / cw; const s = 0.8 + 0.5 * Math.exp(-((u - 0.3) ** 2) / 0.06); blend(x, y, bt.cap[0] * s, bt.cap[1] * s, bt.cap[2] * s, cov) }
  }
}
// contact shadows
for (let y = baseY | 0; y < Math.min(h, baseY + h * 0.05); y++) for (const bt of bottles) {
  const cx = w * bt.cx, bw = w * bt.bw
  for (let x = (cx - bw * 0.7) | 0; x <= cx + bw * 0.7; x++) {
    const d = Math.abs(x - cx) / (bw * 0.7), vy = (y - baseY) / (h * 0.05)
    blend(x, y, 0, 0, 0, (1 - d) * (1 - vy) * 0.25)
  }
}

// grain
let seed = 20260825
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const n = (rnd() - 0.5) * 5, i = (y * w + x) * 3
  buf[i] = clamp(buf[i] + n, 0, 255); buf[i + 1] = clamp(buf[i + 1] + n, 0, 255); buf[i + 2] = clamp(buf[i + 2] + n, 0, 255)
}

// downsample + PNG
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
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(out, { level: 9 })), chunk('IEND', Buffer.alloc(0))])
mkdirSync(new URL('../public/blog', import.meta.url), { recursive: true })
const dest = new URL('../public/blog/lattafa-ramz-silver-vs-gold-hero.png', import.meta.url)
writeFileSync(dest, png)
console.log('Wrote', dest.pathname, (png.length / 1024).toFixed(1) + 'KB')
