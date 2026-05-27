import { useState } from 'react'
import { QUIZ_QS, calcQuizResults } from '../data/quiz'
import { PERFUMES } from '../data/perfumes'

const BUDGET_OPTS = ["All", "Under $25", "Under $35"]

export default function QuizModal({ onClose, onAddToWardrobe, perfumes = PERFUMES }) {
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState(Array(5).fill(null))
  const [results, setResults] = useState([])
  const [budget, setBudget] = useState("All")
  const [aKey, setAKey] = useState(0)
  const [saved, setSaved] = useState([])
  const isR = step === 5

  function pick(v) { const a = [...ans]; a[step] = v; setAns(a) }
  function next() {
    if (step < 4) { setAKey(k => k + 1); setStep(s => s + 1) }
    else { setResults(calcQuizResults(ans, perfumes)); setAKey(k => k + 1); setStep(5) }
  }
  function retake() { setAns(Array(5).fill(null)); setResults([]); setSaved([]); setBudget("All"); setAKey(k => k + 1); setStep(0) }
  function save(id) { if (!saved.includes(id)) { setSaved(s => [...s, id]); onAddToWardrobe(id) } }

  const priceOf = p => parseFloat((p.dupe?.price || "$999").replace("$", ""))
  const visible = results
    .filter(p => {
      if (budget === "Under $25") return priceOf(p) < 25
      if (budget === "Under $35") return priceOf(p) < 35
      return true
    })
    .slice(0, 5)

  const q = QUIZ_QS[step]

  return (
    <div className="quiz-overlay" onClick={e => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label="Scent profile quiz">
      <div className="quiz-modal">
        <div style={{ padding: "18px 24px", borderBottom: "0.5px solid rgba(193,127,58,.2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: "#C17F3A" }}>{isR ? "Your Scent Profile" : `Question ${step + 1} of 5`}</span>
          {!isR && <div style={{ display: "flex", gap: 6 }} aria-label={`Progress: question ${step + 1} of 5`}>{[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i <= step ? "#C17F3A" : "rgba(193,127,58,.22)", transition: "background .3s" }} />)}</div>}
          <button onClick={onClose} aria-label="Close quiz" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "rgba(44,24,16,.38)", lineHeight: 1, padding: "4px 8px" }}>×</button>
        </div>

        <div className="qz-enter" key={aKey} style={{ padding: "26px 24px 28px" }}>
          {isR ? (
            <div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C17F3A", marginBottom: 8 }}>✦ Matched For You ✦</div>
                <h2 style={{ fontSize: "1.7rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810", marginBottom: 6 }}>Your Perfect Matches</h2>
                <p style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.52)", lineHeight: 1.65 }}>Based on your taste profile, we found these for you.</p>
              </div>

              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }} role="group" aria-label="Filter by budget">
                {BUDGET_OPTS.map(b => (
                  <button key={b} onClick={() => setBudget(b)} aria-pressed={budget === b}
                    style={{ padding: "6px 16px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 12, cursor: "pointer", letterSpacing: .3, transition: "all .2s", border: `1px solid ${budget === b ? "#C17F3A" : "rgba(193,127,58,.3)"}`, background: budget === b ? "#C17F3A" : "transparent", color: budget === b ? "white" : "#8b5a1a" }}>
                    {b}
                  </button>
                ))}
              </div>

              {visible.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(44,24,16,.45)", fontFamily: "'DM Sans',sans-serif", fontSize: 14 }}>
                  No matches in this budget — try "Under $35" or "All"
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 24 }}>
                  {visible.map(p => (
                    <div key={p.id} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(44,24,16,.12)" }}>
                      <div style={{ height: 108, background: p.gradient, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 14, position: "relative" }}>
                        <div style={{ position: "absolute", right: -16, top: -16, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
                        <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: p.accent, marginBottom: 3 }}>{p.designer}</div>
                        <div style={{ fontSize: 15, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: p.textCol, lineHeight: 1.2 }}>{p.name}</div>
                      </div>
                      <div style={{ padding: "13px 14px 15px", background: "white" }}>
                        <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: "#C17F3A", marginBottom: 3 }}>Dupe →</div>
                        <div style={{ fontSize: 13, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810", marginBottom: 2 }}>{p.dupe.name}</div>
                        <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.5)", marginBottom: 10 }}>{p.dupe.brand} · {p.dupe.price}</div>
                        <button onClick={() => save(p.id)} aria-pressed={saved.includes(p.id)} style={{ width: "100%", padding: "8px", borderRadius: 10, background: saved.includes(p.id) ? "transparent" : "#C17F3A", border: `1px solid ${saved.includes(p.id) ? "rgba(193,127,58,.4)" : "#C17F3A"}`, color: saved.includes(p.id) ? "#8b5a1a" : "white", fontFamily: "'DM Sans',sans-serif", fontSize: 12, cursor: "pointer", fontWeight: 500, letterSpacing: .3, transition: "all .2s" }}>
                          {saved.includes(p.id) ? "✓ In Wardrobe" : "+ Add to Wardrobe"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <button onClick={retake} style={{ padding: "12px 26px", borderRadius: 50, border: "1.5px solid rgba(193,127,58,.4)", background: "transparent", color: "#8b5a1a", fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: "pointer", letterSpacing: .4 }}>↺ Retake Quiz</button>
                <button onClick={onClose} style={{ padding: "12px 26px", borderRadius: 50, background: "#C17F3A", border: "none", color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: "pointer", letterSpacing: .4, boxShadow: "0 6px 20px rgba(193,127,58,.35)" }}>Explore All →</button>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: "1.65rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810", marginBottom: 5 }}>{q.q}</h2>
              <p style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.52)", marginBottom: 22, lineHeight: 1.5 }}>{q.sub}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 26 }} role="radiogroup" aria-label={q.q}>
                {q.opts.map(o => (
                  <div key={o.v}
                    className={`quiz-opt${ans[step] === o.v ? " sel" : ""}`}
                    onClick={() => pick(o.v)}
                    role="radio" aria-checked={ans[step] === o.v}
                    tabIndex={0}
                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && pick(o.v)}>
                    <div style={{ height: 96, background: o.grad, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <span style={{ fontSize: 30, color: o.col, lineHeight: 1 }} aria-hidden="true">{o.sym}</span>
                      <span style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, color: "rgba(255,255,255,.92)", letterSpacing: .2 }}>{o.v}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {step > 0
                  ? <button onClick={() => { setAKey(k => k + 1); setStep(s => s - 1) }} style={{ padding: "10px 22px", borderRadius: 50, border: "1.5px solid rgba(193,127,58,.4)", background: "transparent", color: "#8b5a1a", fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: "pointer" }}>← Back</button>
                  : <div />}
                <button className="quiz-next" onClick={next} disabled={!ans[step]}>{step === 4 ? "See My Matches ✦" : "Next →"}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
