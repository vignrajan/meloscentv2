import { PERFUMES } from '../data/perfumes'
import { parsePx } from '../utils/storage'

export default function WardrobePage({ wIds, onBack, onRemove, onGoQuiz }) {
  const items = PERFUMES.filter(p => wIds.includes(p.id))
  const totalRetail = items.reduce((s, p) => s + p.retail, 0)
  const totalDupe = items.reduce((s, p) => s + parsePx(p.dupe.price), 0)
  const saved = (totalRetail - totalDupe).toFixed(0)

  return (
    <main className="wd-enter" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "32px 0 24px", borderBottom: "0.5px solid rgba(193,127,58,.15)", marginBottom: 28, flexWrap: "wrap" }}>
        <button className="wd-back-btn" onClick={onBack}>← Discovery</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#C17F3A", marginBottom: 4 }}>✦ My Collection</div>
          <h1 style={{ fontSize: "2.2rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810", lineHeight: 1 }}>My Wardrobe</h1>
        </div>
        {items.length > 0 && <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: "#C17F3A", fontWeight: 500 }}>{items.length} saved</div></div>}
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 56, marginBottom: 20, opacity: .2 }} aria-hidden="true">◇</div>
          <h2 style={{ fontSize: 26, fontFamily: "'Playfair Display',serif", color: "#2C1810", marginBottom: 12 }}>Your wardrobe is empty</h2>
          <p style={{ fontSize: 15, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.5)", maxWidth: 380, margin: "0 auto 28px", lineHeight: 1.75 }}>Take the scent quiz to discover your perfect matches, or flip any card and save dupes you love.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onGoQuiz} style={{ padding: "13px 28px", borderRadius: 50, background: "#C17F3A", border: "none", color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: 14, cursor: "pointer", letterSpacing: .5, boxShadow: "0 6px 20px rgba(193,127,58,.35)" }}>✦ Take the Quiz</button>
            <button onClick={onBack} className="wd-back-btn" style={{ padding: "13px 28px" }}>Browse Fragrances</button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 28, background: "linear-gradient(135deg,#2C1810 0%,#5a3010 50%,#8b5a1a 100%)", padding: "28px 32px", position: "relative" }} role="region" aria-label="Savings summary">
            <div style={{ position: "absolute", right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#d4af37", marginBottom: 6 }}>Your Smart Savings</div>
                <div style={{ fontSize: "2.4rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#d4af37", lineHeight: 1, marginBottom: 6 }} aria-label={`$${saved} saved`}>${saved} saved</div>
                <div style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(212,175,55,.7)" }}>vs. buying originals at retail</div>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[{ l: "Original Value", v: `$${totalRetail}`, strike: true }, { l: "You Paid", v: `$${totalDupe.toFixed(0)}`, strike: false }].map(({ l, v, strike }) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1, textTransform: "uppercase", color: "rgba(212,175,55,.6)", marginBottom: 4 }}>{l}</div>
                    <div style={{ fontSize: 22, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: !strike ? "#d4af37" : "rgba(255,255,255,.45)", textDecoration: strike ? "line-through" : "none" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="wd-grid">
            {items.map(p => {
              const itemSaved = (p.retail - parsePx(p.dupe.price)).toFixed(0)
              return (
                <article key={p.id} className="wd-item" aria-label={`${p.name} by ${p.designer}`}>
                  <div style={{ width: 110, background: p.gradient, flexShrink: 0, position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 14 }} aria-hidden="true">
                    <div style={{ position: "absolute", right: -12, top: -12, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
                    <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.8, textTransform: "uppercase", color: p.accent, marginBottom: 4, opacity: .9 }}>{p.designer}</div>
                    <div style={{ fontSize: 14, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: p.textCol, lineHeight: 1.2 }}>{p.name}</div>
                  </div>
                  <div style={{ flex: 1, padding: "18px 18px 18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: "#C17F3A", marginBottom: 4 }}>Dupe</div>
                          <div style={{ fontSize: 15, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810", lineHeight: 1.2 }}>{p.dupe.name}</div>
                          <div style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.5)", marginTop: 2 }}>{p.dupe.brand}</div>
                        </div>
                        <div style={{ padding: "4px 10px", borderRadius: 50, background: "rgba(193,127,58,.1)", border: "0.5px solid rgba(193,127,58,.25)" }}>
                          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: "#8b5a1a", fontWeight: 500 }}>{p.dupe.match}%</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 18, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810" }}>{p.dupe.price}</div>
                        <div style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.35)", textDecoration: "line-through" }}>${p.retail}</div>
                        <div style={{ padding: "2px 10px", borderRadius: 50, background: "linear-gradient(135deg,#C17F3A,#d4af37)", color: "white", fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>-${itemSaved}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <button className="wd-rm-btn" onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name} from wardrobe`}>Remove</button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}
