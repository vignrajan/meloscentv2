import { BADGES } from '../data/badges'

export default function ProfileDrawer({ stats, open, onClose, onGoWardrobe }) {
  const earned = BADGES.filter(b => b.earned(stats))
  const next = BADGES.find(b => !b.earned(stats))

  return (
    <>
      {open && <div className="prof-overlay" onClick={onClose} aria-hidden="true" />}
      <div className={`prof-drawer${open ? " prof-open" : ""}`} role="dialog" aria-modal="true" aria-label="Fragrance profile">
        <div style={{ padding: "20px", borderBottom: "0.5px solid rgba(193,127,58,.2)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#FAF3E8", zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C17F3A", marginBottom: 2 }}>My Journey</div>
            <div style={{ fontSize: 18, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810" }}>Fragrance Profile</div>
          </div>
          <button onClick={onClose} aria-label="Close profile" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "rgba(44,24,16,.38)", lineHeight: 1, padding: "4px 8px" }}>×</button>
        </div>

        <div style={{ padding: "18px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[{ l: "Flipped", v: stats.fIds.length }, { l: "Saved", v: stats.wIds.length }, { l: "Day Streak", v: stats.streak }].map(({ l, v }) => (
            <div key={l} style={{ background: "white", borderRadius: 12, padding: "13px 10px", textAlign: "center", border: "0.5px solid rgba(193,127,58,.15)" }}>
              <div style={{ fontSize: 26, fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#C17F3A", lineHeight: 1, marginBottom: 4 }}>{v}</div>
              <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.48)", letterSpacing: .4, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 18px 14px" }}>
          <button onClick={() => { onClose(); onGoWardrobe() }} style={{ width: "100%", padding: "13px", borderRadius: 14, background: "linear-gradient(135deg,#2C1810,#5a3010)", border: "none", color: "#d4af37", fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: .2 }}>
            ◇ My Wardrobe <span style={{ fontSize: 12, color: "rgba(212,175,55,.7)", fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}>({stats.wIds.length} saved)</span>
          </button>
        </div>

        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ background: "white", borderRadius: 14, padding: "14px 16px", border: "0.5px solid rgba(193,127,58,.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, color: "#2C1810" }}>Badge Progress</span>
              <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "#C17F3A", fontWeight: 500 }}>{earned.length}/{BADGES.length}</span>
            </div>
            <div style={{ height: 6, background: "rgba(193,127,58,.15)", borderRadius: 3, overflow: "hidden", marginBottom: 8 }} role="progressbar" aria-valuenow={earned.length} aria-valuemin={0} aria-valuemax={BADGES.length}>
              <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#C17F3A,#d4af37)", width: `${(earned.length / BADGES.length) * 100}%`, transition: "width .6s ease" }} />
            </div>
            {next && <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.42)", lineHeight: 1.4 }}>Next: <em>{next.name}</em> — {next.hint}</div>}
          </div>
        </div>

        <div style={{ padding: "0 18px 36px" }}>
          <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C17F3A", marginBottom: 14 }}>✦ Badges</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {BADGES.map(b => {
              const ok = b.earned(stats), pct = b.prog(stats)
              return (
                <div key={b.id} className="badge-item" style={{ background: "white", borderRadius: 14, padding: "14px", border: `0.5px solid ${ok ? "rgba(193,127,58,.3)" : "rgba(44,24,16,.08)"}`, opacity: ok ? 1 : .6 }} aria-label={`${b.name}: ${ok ? "earned" : "locked — " + b.hint}`}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: ok ? b.bg : "linear-gradient(135deg,#aaa098,#878078)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 9, filter: ok ? "none" : "grayscale(1) opacity(.6)" }} aria-hidden="true">
                    <span style={{ fontSize: 20, color: "rgba(255,255,255,.9)" }}>{b.sym}</span>
                  </div>
                  <div style={{ fontSize: 12, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: ok ? "#2C1810" : "rgba(44,24,16,.45)", marginBottom: 3, lineHeight: 1.2 }}>{b.name}</div>
                  <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.42)", marginBottom: 8, lineHeight: 1.35 }}>{ok ? b.desc : `🔒 ${b.hint}`}</div>
                  {ok
                    ? <div style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", color: "#C17F3A", fontWeight: 500, letterSpacing: .5 }}>✓ Earned</div>
                    : <div style={{ height: 3, background: "rgba(193,127,58,.15)", borderRadius: 2 }} role="progressbar" aria-valuenow={Math.round(pct * 100)} aria-valuemin={0} aria-valuemax={100}><div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#C17F3A,#d4af37)", width: `${pct * 100}%`, transition: "width .5s" }} /></div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
