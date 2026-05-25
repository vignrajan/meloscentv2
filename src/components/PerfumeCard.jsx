import { useState, useEffect } from 'react'
import { fmt } from '../utils/currency'
import { parsePx } from '../utils/storage'
import { getBuyUrl } from '../utils/affiliates'

const IMAGE_CACHE = new Map()

function useUnsplashImage(query, index, orientation = 'portrait') {
  const [state, setState] = useState({ src: null, loaded: false, loading: false, error: false })
  const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

  useEffect(() => {
    if (!apiKey || !query) return
    let alive = true
    setState(s => ({ ...s, loading: true }))
    const cacheKey = `${orientation}:${query}`

    const preload = url => {
      if (!url || !alive) return
      const img = new Image()
      img.onload = () => { if (alive) setState({ src: url, loaded: true, loading: false, error: false }) }
      img.onerror = () => { if (alive) setState(s => ({ ...s, loading: false, error: true })) }
      img.src = url
    }

    if (IMAGE_CACHE.has(cacheKey)) {
      const urls = IMAGE_CACHE.get(cacheKey)
      preload(urls[index % Math.max(urls.length, 1)])
      return () => { alive = false }
    }

    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKey}&per_page=8&orientation=${orientation}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const urls = (data.results || []).map(r => r.urls.small)
        IMAGE_CACHE.set(cacheKey, urls)
        if (alive) preload(urls[index % Math.max(urls.length, 1)])
      })
      .catch(() => {
        IMAGE_CACHE.set(cacheKey, [])
        if (alive) setState(s => ({ ...s, loading: false, error: true }))
      })

    return () => { alive = false }
  }, [query, index, apiKey, orientation])

  return state
}

function NotePill({ note, dark, onClick, active }) {
  const handle = onClick ? e => { e.stopPropagation(); onClick(note) } : undefined
  return dark
    ? <span className={`npill${onClick ? " clickable" : ""}`} onClick={handle} style={{ background: active ? "#C17F3A" : "rgba(193,127,58,.1)", color: active ? "white" : "#8b5a1a", border: `0.5px solid ${active ? "#C17F3A" : "rgba(193,127,58,.22)"}` }}>{note}</span>
    : <span className={`npill${onClick ? " clickable" : ""}`} onClick={handle} style={{ background: active ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.16)", color: "rgba(255,255,255,.95)", border: active ? "1.5px solid rgba(255,255,255,.8)" : "none" }}>{note}</span>
}

function ScentStrip({ notes, dark, onNoteClick, noteFilter }) {
  const lbl = { fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: dark ? "#C17F3A" : "rgba(255,255,255,.55)", marginRight: 6, display: "block", marginBottom: 4 }
  const pill = n => <NotePill key={n} note={n} dark={dark} onClick={onNoteClick} active={noteFilter === n} />
  return (
    <div>
      <div style={{ marginBottom: 6 }}><span style={lbl}>Top</span>{notes.top.map(pill)}</div>
      <div style={{ marginBottom: 6 }}><span style={lbl}>Mid</span>{notes.mid.map(pill)}</div>
      <div><span style={lbl}>Base</span>{notes.base.map(pill)}</div>
    </div>
  )
}

function MatchRing({ score }) {
  const r = 28, c = 2 * Math.PI * r
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <svg width="68" height="68" viewBox="0 0 68 68" aria-label={`${score}% scent match`} role="img">
        <defs><linearGradient id="mg"><stop offset="0%" stopColor="#C17F3A" /><stop offset="100%" stopColor="#d4af37" /></linearGradient></defs>
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(193,127,58,.15)" strokeWidth="5" />
        <circle cx="34" cy="34" r={r} fill="none" stroke="url(#mg)" strokeWidth="5" strokeDasharray={`${(score / 100) * c} ${c}`} strokeLinecap="round" transform="rotate(-90 34 34)" />
        <text x="34" y="39" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="14" fontWeight="500" fill="#5a3010">{score}%</text>
      </svg>
      <div>
        <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: "#C17F3A", marginBottom: 3 }}>Scent Match</div>
        <div style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "#a07040" }}>Verified similarity</div>
      </div>
    </div>
  )
}

export default function PerfumeCard({ p, onFlip, onNoteClick, noteFilter, compareIds, onCompare, wardrobeIds, onWardrobeToggle, currency = "USD" }) {
  const [flipped, setFlipped] = useState(false)
  const inCmp = compareIds.includes(p.id)
  const cmpFull = compareIds.length === 2 && !inCmp
  const inWd = wardrobeIds.includes(p.id)

  const moodKey  = p.mood.split(' ')[0].toLowerCase()
  const frontImg = useUnsplashImage(`${moodKey} luxury perfume bottle`, p.id)
  const backImg  = useUnsplashImage('fragrance bottle minimalist clean', p.id)

  const handleClick = e => {
    if (e.target.closest('a, button')) return
    if (!flipped && onFlip) onFlip(p.id)
    setFlipped(f => !f)
  }
  const handleCmp = e => { e.stopPropagation(); if (!cmpFull) onCompare(p.id) }
  const handleWd  = e => { e.stopPropagation(); onWardrobeToggle(p.id) }

  const dupePrice   = fmt(parsePx(p.dupe.price), currency)
  const retailPrice = fmt(p.retail, currency)

  const frontOverlay = 'linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.48) 38%,rgba(0,0,0,.08) 72%,transparent 100%),radial-gradient(ellipse at 50% 50%,transparent 52%,rgba(0,0,0,.22) 100%)'

  return (
    <div className="mcard-wrap">
      <div className={`mcard-scene${flipped ? " is-flipped" : ""}`} style={{ height: p.height }} onClick={handleClick}
        role="button" tabIndex={0} aria-label={`${p.designer} ${p.name} — ${flipped ? "showing dupe" : "click to reveal dupe"}`}
        onKeyDown={e => e.key === "Enter" && !e.target.closest('a, button') && handleClick(e)}>
        <div className={`mcard-inner mcard-shadow${flipped ? " flipped" : ""}`} style={{ height: p.height, borderRadius: 20, boxShadow: "0 10px 40px rgba(44,24,16,.18)" }}>

          {/* FRONT */}
          <div className="mcard-face" style={{ background: p.gradient }}>
            {/* Pulse placeholder while image loads */}
            {frontImg.loading && !frontImg.loaded && (
              <div className="mcard-img-pulse" style={{ background: p.gradient }} />
            )}
            {/* Bottle image – luminosity blend so it inherits the card's hue */}
            <div
              className={`mcard-img-bg mcard-img-front${frontImg.loaded ? ' loaded' : ''}`}
              style={frontImg.src ? { backgroundImage: `url(${frontImg.src})` } : {}}
            />
            {/* Bottom-fade gradient + edge vignette */}
            <div className="mcard-img-overlay" style={{ background: frontOverlay }} />
            {/* Editorial grain texture */}
            <div className="mcard-grain" />

            <div style={{ position: "absolute", right: -28, top: -28, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,.06)", pointerEvents: "none" }} />
            <button className="cmp-btn" onClick={handleCmp}
              aria-label={inCmp ? "Remove from compare" : "Add to compare"}
              style={{ position: "absolute", top: 10, right: 10, zIndex: 5, width: 28, height: 28, fontSize: 13, background: inCmp ? "#C17F3A" : "rgba(255,255,255,.32)", color: inCmp ? "white" : "rgba(255,255,255,.9)", opacity: cmpFull ? .3 : 1, border: `1.5px solid ${inCmp ? "#C17F3A" : "rgba(255,255,255,.5)"}`, backdropFilter: "blur(4px)" }}>
              {inCmp ? "✓" : "+"}
            </button>
            <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24, zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingRight: 36 }}>
                <span style={{ padding: "4px 13px", borderRadius: 50, background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.92)", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .7, fontWeight: 500, border: "0.5px solid rgba(255,255,255,.22)" }}>{p.badge}</span>
                <span style={{ padding: "4px 13px", borderRadius: 50, background: "rgba(0,0,0,.18)", color: "rgba(255,255,255,.82)", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .4 }}>{p.mood}</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, letterSpacing: 2.5, textTransform: "uppercase", color: p.accent, marginBottom: 6, opacity: .9 }}>{p.designer}</div>
                <div style={{ fontSize: 28, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: p.textCol, lineHeight: 1.15, marginBottom: 6 }}>{p.name}</div>
                <div className="flip-hint" style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", letterSpacing: .3 }}>↩ Tap to reveal dupe</div>
              </div>
              <div>
                <div style={{ borderTop: "0.5px solid rgba(255,255,255,.15)", paddingTop: 13, marginBottom: 8 }}>
                  <ScentStrip notes={p.notes} dark={false} onNoteClick={onNoteClick} noteFilter={noteFilter} />
                </div>
                <div className="cmp-hint">+ Compare</div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="mcard-face mcard-back" style={{ background: "linear-gradient(160deg,#FAF3E8 0%,#F0E4D0 60%,#E8D4BC 100%)" }}>
            {/* Dupe image – screen blend for a washed, lighter, affordable feel */}
            <div
              className={`mcard-img-bg mcard-img-back${backImg.loaded ? ' loaded' : ''}`}
              style={backImg.src ? { backgroundImage: `url(${backImg.src})`, backgroundPosition: 'center top' } : {}}
            />
            {/* Grain on back */}
            <div className="mcard-grain" />

            <div style={{ position: "absolute", right: -18, top: -18, width: 96, height: 96, borderRadius: "50%", background: "rgba(193,127,58,.07)", pointerEvents: "none" }} />
            <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24, zIndex: 1 }}>
              <div>
                <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C17F3A", marginBottom: 8 }}>A Perfect Alternative For</div>
                <div style={{ fontSize: 13, fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#8b6a3a" }}>{p.designer} — {p.name}</div>
              </div>
              <div>
                <div style={{ marginBottom: 14 }}><MatchRing score={p.dupe.match} /></div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.8, textTransform: "uppercase", color: "#C17F3A", marginBottom: 5 }}>{p.dupe.brand}</div>
                    <div style={{ fontSize: 20, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810", lineHeight: 1.1 }}>{p.dupe.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#5a3010" }}>
                      <span key={currency} className="price-anim">{dupePrice}</span>
                    </div>
                    <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "#C17F3A", letterSpacing: .5 }}>
                      vs. <span key={currency} className="price-anim">{retailPrice}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 2 }}>
                  <button className={`wd-add-btn${inWd ? " saved" : ""}`} style={{ flex: 1 }} onClick={handleWd} aria-pressed={inWd}>
                    {inWd ? "✓ Saved" : "+ Wardrobe"}
                  </button>
                  <a href={getBuyUrl(p.dupe.brand, p.dupe.name, currency)}
                     target="_blank" rel="noopener noreferrer"
                     className="buy-btn"
                     onClick={e => e.stopPropagation()}
                     aria-label={`Buy ${p.dupe.name} by ${p.dupe.brand}`}>
                    Buy Now →
                  </a>
                </div>
              </div>
              <div style={{ borderTop: "0.5px solid rgba(193,127,58,.2)", paddingTop: 13 }}>
                <ScentStrip notes={p.notes} dark={true} onNoteClick={onNoteClick} noteFilter={noteFilter} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
