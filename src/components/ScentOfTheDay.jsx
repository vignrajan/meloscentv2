import { useState, useEffect } from 'react'
import { PERFUMES } from '../data/perfumes'
import { fmt } from '../utils/currency'
import { parsePx } from '../utils/storage'
import { getBuyUrl } from '../utils/affiliates'

function useBannerImage(seed) {
  const [state, setState] = useState({ src: null, loaded: false })
  useEffect(() => {
    if (!seed) return
    const url = `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/500`
    const img = new Image()
    img.onload = () => setState({ src: url, loaded: true })
    img.onerror = () => {}
    img.src = url
    return () => { img.onload = null; img.onerror = null }
  }, [seed])
  return state
}

export default function ScentOfTheDay({ onOpenQuiz, perfumes = PERFUMES, currency = "USD" }) {
  const p = perfumes[new Date().getDate() % perfumes.length]
  const light = p.textCol !== "#FAF3E8"
  const oBg = light ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.16)"
  const oBd = light ? "rgba(0,0,0,.18)" : "rgba(255,255,255,.26)"
  const oTxt = light ? p.textCol : "rgba(255,255,255,.92)"
  const dBg = light ? "rgba(0,0,0,.07)" : "rgba(255,255,255,.13)"
  const dTxt = light ? "#2C1810" : "rgba(255,255,255,.96)"
  const dSub = light ? "rgba(44,24,16,.55)" : "rgba(255,255,255,.65)"
  const mBg = light ? "rgba(0,0,0,.08)" : "rgba(0,0,0,.18)"
  const mTxt = light ? "rgba(44,24,16,.65)" : "rgba(255,255,255,.85)"

  const bannerImg = useBannerImage(`sotd-${p.id}`)

  return (
    <div className="sotd-banner" style={{ background: p.gradient }} role="banner" aria-label="Scent of the Day">
      <div style={{ position: "absolute", right: -80, top: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,.07)", pointerEvents: "none" }} aria-hidden="true" />
      <div style={{ position: "absolute", left: -40, bottom: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(0,0,0,.08)", pointerEvents: "none" }} aria-hidden="true" />

      {/* Bottle image anchored right, fading left into the gradient */}
      <div
        className={`sotd-img-bg${bannerImg.loaded ? ' loaded' : ''}`}
        style={bannerImg.src ? { backgroundImage: `url(${bannerImg.src})` } : {}}
        aria-hidden="true"
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 28px", display: "flex", alignItems: "center", gap: 40, position: "relative", zIndex: 1, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", borderRadius: 50, background: oBg, marginBottom: 14, backdropFilter: "blur(6px)", border: `0.5px solid ${oBd}` }}>
            <span style={{ fontSize: 10, color: oTxt, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>✦ Today's Pick</span>
          </div>
          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2.5, textTransform: "uppercase", color: p.accent, marginBottom: 5, opacity: .9 }}>{p.designer}</div>
          <div style={{ fontSize: "2rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: p.textCol, lineHeight: 1.15, marginBottom: 10 }}>{p.name}</div>
          <div style={{ display: "inline-flex", padding: "4px 14px", borderRadius: 50, background: mBg, color: mTxt, fontSize: 12, fontFamily: "'DM Sans',sans-serif", marginBottom: 20 }}>{p.mood}</div>
          <div>
            <button className="sotd-quiz-btn" onClick={onOpenQuiz}
              style={{ background: oBg, border: `1.5px solid ${oBd}`, color: oTxt, backdropFilter: "blur(6px)" }}
              aria-label="Take the scent quiz">
              ✦ Find Your Scent
            </button>
          </div>
        </div>
        <div style={{ background: dBg, backdropFilter: "blur(14px)", borderRadius: 18, padding: "20px 24px", minWidth: 220, border: `0.5px solid ${oBd}`, flexShrink: 0 }} aria-label="Dupe recommendation">
          <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: dSub, marginBottom: 12 }}>Perfect Dupe</div>
          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: p.accent, marginBottom: 4 }}>{p.dupe.brand}</div>
          <div style={{ fontSize: 20, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: dTxt, marginBottom: 10 }}>{p.dupe.name}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 22, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: dTxt }}>
              <span key={currency} className="price-anim">{fmt(parsePx(p.dupe.price), currency)}</span>
            </div>
            <div style={{ padding: "4px 12px", borderRadius: 50, background: oBg, color: oTxt, fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, border: `0.5px solid ${oBd}` }}>{p.dupe.match}% match</div>
          </div>
          <a href={getBuyUrl(p.dupe.brand, p.dupe.name, currency)}
             target="_blank" rel="noopener noreferrer"
             className="buy-btn"
             style={{ width: "100%", justifyContent: "center" }}
             aria-label={`Buy ${p.dupe.name} by ${p.dupe.brand}`}>
            Buy Now →
          </a>
        </div>
      </div>
    </div>
  )
}
