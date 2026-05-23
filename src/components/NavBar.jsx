import { useState, useEffect } from 'react'

export default function NavBar({ page, stats, earnedCount, onNavigate, onOpenProfile, onScrollToBlog, onFilterNiche }) {
  const [mob, setMob] = useState(false)
  const wdCount = stats.wIds.length

  useEffect(() => {
    document.body.style.overflow = mob ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mob])

  const close = () => setMob(false)

  return (
    <>
      <nav style={{ maxWidth: 1400, margin: "0 auto", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "0.5px solid rgba(193,127,58,.15)" }}>
        <button onClick={() => { onNavigate("discovery"); close() }} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }} aria-label="Go to homepage">
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#C17F3A,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(193,127,58,.35)" }}>
            <span style={{ fontSize: 15, color: "white", lineHeight: 1 }}>✦</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#2C1810", letterSpacing: "-.3px" }}>
            Melo<span style={{ color: "#C17F3A" }}>scent</span>
          </span>
        </button>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <button className="nav-link" onClick={() => onNavigate("discovery")} style={{ color: page === "discovery" ? "#C17F3A" : undefined }}>Discovery</button>
          <button className="nav-link" onClick={() => onNavigate("wardrobe")} style={{ color: page === "wardrobe" ? "#C17F3A" : undefined }}>
            Wardrobe{wdCount > 0 && <span style={{ marginLeft: 5, fontSize: 10, background: "#C17F3A", color: "white", borderRadius: 50, padding: "1px 6px", verticalAlign: "middle" }}>{wdCount}</span>}
          </button>
          <button className="nav-link" onClick={() => { onNavigate("discovery"); onFilterNiche() }}>Niche</button>
          <button className="nav-link" onClick={() => { onNavigate("discovery"); setTimeout(onScrollToBlog, 120) }}>Journal</button>
          <button className="prof-btn" onClick={onOpenProfile} aria-label={`Open profile — ${earnedCount} badges earned`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            {earnedCount > 0 && <div aria-hidden="true" style={{ position: "absolute", top: -3, right: -3, width: 16, height: 16, borderRadius: "50%", background: "#2C1810", color: "#d4af37", fontSize: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #FAF3E8" }}>{earnedCount}</div>}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="hamburger" onClick={() => setMob(true)} aria-label="Open navigation menu" aria-expanded={mob}>
            <span className="h-line" /><span className="h-line" /><span className="h-line" />
          </button>
        </div>
      </nav>

      {mob && (
        <div className="mob-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mob-menu-header">
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#C17F3A" }}>Meloscent</span>
            <button onClick={close} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26, color: "rgba(44,24,16,.4)", lineHeight: 1, padding: "4px 8px" }}>×</button>
          </div>
          <div style={{ padding: "12px 0" }}>
            {[["Discovery", "discovery"], ["Wardrobe", "wardrobe"]].map(([l, pg]) => (
              <button key={pg} className="mob-nav-item" onClick={() => { onNavigate(pg); close() }}>
                {l}{pg === "wardrobe" && wdCount > 0 && ` (${wdCount})`}
              </button>
            ))}
            <button className="mob-nav-item" onClick={() => { onNavigate("discovery"); onFilterNiche(); close() }}>Niche</button>
            <button className="mob-nav-item" onClick={() => { onNavigate("discovery"); setTimeout(onScrollToBlog, 200); close() }}>Journal</button>
          </div>
          <div style={{ padding: "16px 0 0", borderTop: "0.5px solid rgba(193,127,58,.12)" }}>
            {["Instagram", "Pinterest", "TikTok"].map(s => (
              <button key={s} className="mob-nav-sub" onClick={close}>{s}</button>
            ))}
          </div>
          <div style={{ padding: "24px 28px", marginTop: "auto" }}>
            <button onClick={() => { onOpenProfile(); close() }} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg,#C17F3A,#d4af37)", border: "none", color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", letterSpacing: .4 }}>
              My Profile {earnedCount > 0 && `· ${earnedCount} badges`}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
