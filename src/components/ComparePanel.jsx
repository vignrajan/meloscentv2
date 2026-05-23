import { PERFUMES } from '../data/perfumes'
import { parsePx } from '../utils/storage'
import { fmt } from '../utils/currency'

export default function ComparePanel({ ids, onClear, perfumes = PERFUMES, currency = "USD" }) {
  const open = ids.length === 2
  if (ids.length === 0) return null

  const perfs = ids.map(id => perfumes.find(p => p.id === id)).filter(Boolean)
  const [pA, pB] = perfs.length === 2 ? perfs : [perfs[0], null]
  const allA = pA ? [...pA.notes.top, ...pA.notes.mid, ...pA.notes.base] : []
  const allB = pB ? [...pB.notes.top, ...pB.notes.mid, ...pB.notes.base] : []
  const shared = allA.filter(n => allB.includes(n))

  const savA_usd = pA ? pA.retail - parsePx(pA.dupe.price) : null
  const savB_usd = pB ? pB.retail - parsePx(pB.dupe.price) : null
  const betterVal = pB && savB_usd > savA_usd ? "B" : "A"

  const rows = [
    { label: "Mood",       a: pA?.mood,                                       b: pB?.mood },
    { label: "Badge",      a: pA?.badge,                                      b: pB?.badge },
    { label: "Retail",     a: pA ? fmt(pA.retail, currency) : "-",            b: pB ? fmt(pB.retail, currency) : "-" },
    { label: "Dupe Price", a: pA ? fmt(parsePx(pA.dupe.price), currency) : "-", b: pB ? fmt(parsePx(pB.dupe.price), currency) : "-" },
    { label: "You Save",   a: savA_usd != null ? fmt(savA_usd, currency) : "—", b: savB_usd != null ? fmt(savB_usd, currency) : "—" },
    { label: "Match",      a: pA ? `${pA.dupe.match}%` : "-",                b: pB ? `${pB.dupe.match}%` : "-" },
  ]

  return (
    <>
      {open && <div className="cmp-overlay" onClick={onClear} aria-hidden="true" />}
      <div className={`cmp-panel${open ? " cmp-open" : ""}`} role="dialog" aria-modal="true" aria-label="Fragrance comparison">
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }} aria-hidden="true">
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(193,127,58,.25)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px 16px" }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C17F3A", marginBottom: 2 }}>Side by Side</div>
            <div style={{ fontSize: 18, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810" }}>Compare</div>
          </div>
          <button onClick={onClear} aria-label="Clear comparison" style={{ padding: "8px 20px", borderRadius: 50, border: "1.5px solid rgba(193,127,58,.35)", background: "transparent", color: "#8b5a1a", fontFamily: "'DM Sans',sans-serif", fontSize: 12, cursor: "pointer", letterSpacing: .4, transition: "all .2s" }}>Clear ×</button>
        </div>

        <div style={{ padding: "0 24px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: 0, marginBottom: 16 }}>
            <div />
            {[pA, pB].map((p, i) => p && (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", margin: "0 6px", boxShadow: "0 6px 24px rgba(44,24,16,.14)" }}>
                <div style={{ height: 90, background: p.gradient, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "12px 14px", position: "relative" }}>
                  <div style={{ position: "absolute", right: -12, top: -12, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} aria-hidden="true" />
                  {((i === 0 && betterVal === "A") || (i === 1 && betterVal === "B")) && (
                    <div style={{ position: "absolute", top: 8, right: 8, padding: "2px 8px", borderRadius: 50, background: "rgba(212,175,55,.3)", border: "0.5px solid rgba(212,175,55,.5)" }}>
                      <span style={{ fontSize: 9, fontFamily: "'DM Sans',sans-serif", color: "#fff0a0", letterSpacing: .5 }}>✦ Best Value</span>
                    </div>
                  )}
                  <div style={{ fontSize: 9, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: p.accent, marginBottom: 2 }}>{p.designer}</div>
                  <div style={{ fontSize: 13, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: p.textCol, lineHeight: 1.2 }}>{p.name}</div>
                </div>
                <div style={{ padding: "8px 14px 10px", background: "white" }}>
                  <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.5)", marginBottom: 2 }}>{p.dupe.brand}</div>
                  <div style={{ fontSize: 12, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810" }}>{p.dupe.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: 14, overflow: "hidden", border: "0.5px solid rgba(193,127,58,.15)", marginBottom: 20 }}>
            {rows.map((row, i) => (
              <div key={row.label} className="cmp-row" style={{ background: i % 2 === 0 ? "white" : "rgba(193,127,58,.03)" }}>
                <div style={{ padding: "10px 14px", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .5, textTransform: "uppercase", color: "rgba(44,24,16,.45)", fontWeight: 500 }}>{row.label}</div>
                {[row.a, row.b].map((val, j) => (
                  <div key={j} style={{ padding: "10px 14px", textAlign: "center", fontSize: 13, fontFamily: ["Retail", "Dupe Price", "You Save"].includes(row.label) ? "'Playfair Display',serif" : "'DM Sans',sans-serif", fontWeight: row.label === "You Save" ? 700 : 400, color: row.label === "You Save" ? "#C17F3A" : "#2C1810" }}>
                    {["Retail", "Dupe Price", "You Save"].includes(row.label)
                      ? <span key={currency} className="price-anim">{val || "—"}</span>
                      : (val || "—")}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {shared.length > 0 && (
            <div style={{ padding: "16px", background: "rgba(193,127,58,.06)", borderRadius: 14, border: "0.5px solid rgba(193,127,58,.18)" }} aria-label={`Notes in common: ${shared.join(", ")}`}>
              <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C17F3A", marginBottom: 10 }}>✦ Notes in Common</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {shared.map(n => <span key={n} style={{ padding: "3px 12px", borderRadius: 50, background: "#C17F3A", color: "white", fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{n}</span>)}
              </div>
            </div>
          )}

          {!open && perfs.length === 1 && (
            <div style={{ textAlign: "center", padding: "16px", background: "rgba(193,127,58,.06)", borderRadius: 14, border: "1px dashed rgba(193,127,58,.3)" }}>
              <div style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.5)", lineHeight: 1.6 }}>Pick one more fragrance to compare with <em style={{ fontFamily: "'Playfair Display',serif", color: "#2C1810" }}>{pA?.name}</em></div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
