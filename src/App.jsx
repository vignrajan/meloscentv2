import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import ScentOfTheDay from './components/ScentOfTheDay'
import PerfumeCard from './components/PerfumeCard'
import BlogCard from './components/BlogCard'
import QuizModal from './components/QuizModal'
import ProfileDrawer from './components/ProfileDrawer'
import WardrobePage from './components/WardrobePage'
import ComparePanel from './components/ComparePanel'
import Toast from './components/Toast'
import { PERFUMES } from './data/perfumes'
import { BLOGS } from './data/blogs'
import { BADGES } from './data/badges'
import { rLS, wLS } from './utils/storage'

const MOOD_FILTERS = ["Woody", "Floral", "Gourmand", "Fresh", "Oriental", "Niche"]

export default function App() {
  const [page, setPage] = useState("discovery")
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("")
  const [noteFilter, setNoteFilter] = useState("")
  const [compareIds, setCompareIds] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [toast, setToast] = useState(null)
  const [stats, setStats] = useState({
    fIds: rLS("melo_fids", []),
    wIds: rLS("melo_wids", []),
    streak: 1,
  })

  useEffect(() => {
    document.title = page === "wardrobe"
      ? "My Wardrobe — Meloscent"
      : "Meloscent · Fragrance Discovery Platform"
    let fav = document.querySelector("link[rel~='icon']") || document.createElement("link")
    fav.rel = "icon"; fav.type = "image/svg+xml"
    fav.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%232C1810'/><text y='74' x='50' text-anchor='middle' font-size='58' fill='%23C17F3A'>✦</text></svg>"
    document.head.appendChild(fav)
  }, [page])

  useEffect(() => {
    document.body.style.overflow = (showQuiz || showProfile) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [showQuiz, showProfile])

  useEffect(() => {
    const today = new Date().toDateString()
    const yest = new Date(Date.now() - 86400000).toDateString()
    const s = rLS("melo_streak", { lv: "", n: 0 })
    let n = 1
    if (s.lv === today) n = s.n
    else if (s.lv === yest) n = s.n + 1
    wLS("melo_streak", { lv: today, n })
    setStats(st => ({ ...st, streak: n }))
  }, [])

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2400) }

  const navigateTo = pg => { setPage(pg); window.scrollTo({ top: 0, behavior: "smooth" }) }
  const scrollToBlog = () => { const el = document.getElementById("melo-blog"); if (el) el.scrollIntoView({ behavior: "smooth" }) }
  const filterNiche = () => { setActiveFilter("Niche"); setQuery(""); setNoteFilter("") }

  const flip = id => setStats(s => {
    if (s.fIds.includes(id)) return s
    const nf = [...s.fIds, id]; wLS("melo_fids", nf); return { ...s, fIds: nf }
  })

  const wardrobeToggle = id => setStats(s => {
    const has = s.wIds.includes(id)
    const nw = has ? s.wIds.filter(i => i !== id) : [...s.wIds, id]
    wLS("melo_wids", nw)
    showToast(has ? "Removed from wardrobe" : "✦ Saved to your wardrobe")
    return { ...s, wIds: nw }
  })

  const compare = id => setCompareIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : ids.length < 2 ? [...ids, id] : ids)
  const handleNoteClick = note => setNoteFilter(f => f === note ? "" : note)
  const handleSearch = v => { setQuery(v); setActiveFilter("") }
  const handleFilter = t => { setActiveFilter(a => a === t ? "" : t); setQuery("") }
  const clearAll = () => { setQuery(""); setActiveFilter(""); setNoteFilter("") }

  const eq = activeFilter || query
  const filtered = PERFUMES.filter(p => {
    const q = eq.toLowerCase()
    const mS = !q || p.designer.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
      || p.mood.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q)
      || [...p.notes.top, ...p.notes.mid, ...p.notes.base].some(n => n.toLowerCase().includes(q))
      || p.dupe.brand.toLowerCase().includes(q) || p.dupe.name.toLowerCase().includes(q)
    const mN = !noteFilter || [...p.notes.top, ...p.notes.mid, ...p.notes.base].includes(noteFilter)
    return mS && mN
  })

  const earnedCount = BADGES.filter(b => b.earned(stats)).length
  const sharedNavProps = {
    page, stats, earnedCount,
    onNavigate: navigateTo,
    onOpenProfile: () => setShowProfile(true),
    onScrollToBlog: scrollToBlog,
    onFilterNiche: filterNiche,
  }

  if (page === "wardrobe") return (
    <div style={{ background: "#FAF3E8", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }}>
      <NavBar {...sharedNavProps} />
      <WardrobePage wIds={stats.wIds} onBack={() => navigateTo("discovery")}
        onRemove={wardrobeToggle} onGoQuiz={() => { navigateTo("discovery"); setShowQuiz(true) }} />
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onAddToWardrobe={wardrobeToggle} />}
      <ProfileDrawer stats={stats} open={showProfile} onClose={() => setShowProfile(false)}
        onGoWardrobe={() => { setShowProfile(false); navigateTo("wardrobe") }} />
      <Toast message={toast} />
    </div>
  )

  return (
    <div style={{ background: "#FAF3E8", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", paddingBottom: compareIds.length > 0 ? 200 : 0, transition: "padding-bottom .4s" }}>
      <NavBar {...sharedNavProps} />
      <ScentOfTheDay onOpenQuiz={() => setShowQuiz(true)} />

      <section style={{ textAlign: "center", padding: "56px 28px 32px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 400, letterSpacing: 4, textTransform: "uppercase", color: "#C17F3A", marginBottom: 14 }}>✦ Fragrance Discovery Platform ✦</div>
        <h1 className="melo-hero-h1">Wear the Story.<br /><em style={{ fontWeight: 400, color: "#C17F3A", fontStyle: "italic" }}>Not the Price Tag.</em></h1>
        <p style={{ fontSize: 16, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.55)", maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.75 }}>Discover affordable dupes for the world's most coveted fragrances. Flip each card to reveal your perfect match.</p>
        <div style={{ marginBottom: 32 }}>
          <button className="hero-quiz-btn" onClick={() => setShowQuiz(true)} aria-label="Take the scent profile quiz">
            <span aria-hidden="true">✦</span> Find Your Scent Profile
          </button>
        </div>
        <div style={{ position: "relative", maxWidth: 580, margin: "0 auto 18px" }}>
          <svg style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", opacity: .35 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input className="melo-search" type="search" placeholder="Search by designer, mood, notes, or keyword..."
            value={query} onChange={e => handleSearch(e.target.value)} aria-label="Search fragrances" />
          {(query || activeFilter || noteFilter) && (
            <button onClick={clearAll} aria-label="Clear all filters" style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "rgba(44,24,16,.35)", lineHeight: 1, padding: "4px 8px" }}>×</button>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }} role="group" aria-label="Filter by mood">
          {MOOD_FILTERS.map(t => (
            <button key={t} className={`filter-pill${activeFilter === t ? " active" : ""}`} onClick={() => handleFilter(t)} aria-pressed={activeFilter === t}>{t}</button>
          ))}
        </div>
      </section>

      {noteFilter && (
        <div style={{ maxWidth: 1400, margin: "0 auto 8px", padding: "0 28px" }}>
          <div className="note-filter-bar" role="status" aria-live="polite">
            <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1, color: "#8b5a1a" }}>◉ Note filter:</span>
            <span style={{ fontSize: 13, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810", fontStyle: "italic" }}>{noteFilter}</span>
            <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", color: "rgba(44,24,16,.4)" }}>— {filtered.length} match{filtered.length !== 1 ? "es" : ""}</span>
            <button onClick={() => setNoteFilter("")} aria-label={`Remove note filter: ${noteFilter}`} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "rgba(44,24,16,.4)", lineHeight: 1, padding: "0 2px", marginLeft: 2 }}>×</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1400, margin: "0 auto 26px", padding: "0 28px" }} aria-hidden="true">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1, height: ".5px", background: "linear-gradient(90deg,transparent,rgba(193,127,58,.35))" }} />
          <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 2, color: "#C17F3A", textTransform: "uppercase", whiteSpace: "nowrap" }}>{filtered.length} Fragrance{filtered.length !== 1 ? "s" : ""}</span>
          <div style={{ flex: 1, height: ".5px", background: "linear-gradient(90deg,rgba(193,127,58,.35),transparent)" }} />
        </div>
      </div>

      {compareIds.length === 1 && (
        <div style={{ maxWidth: 1400, margin: "0 auto 14px", padding: "0 28px" }} role="status" aria-live="polite">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 50, background: "rgba(193,127,58,.08)", border: "1px solid rgba(193,127,58,.2)" }}>
            <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "#8b5a1a" }}>+ Pick one more card to compare</span>
          </div>
        </div>
      )}

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }} aria-label="Fragrance collection">
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: .28 }} aria-hidden="true">◎</div>
            <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display',serif", color: "#2C1810", marginBottom: 10 }}>No Scents Found</h2>
            <p style={{ fontSize: 15, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.45)", maxWidth: 360, margin: "0 auto 24px", lineHeight: 1.7 }}>Try a different mood, note, or designer.</p>
            <button onClick={clearAll} style={{ padding: "11px 30px", borderRadius: 50, background: "#C17F3A", border: "none", color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: 14, cursor: "pointer", letterSpacing: .5, boxShadow: "0 6px 20px rgba(193,127,58,.35)" }}>Clear Filters</button>
          </div>
        ) : (
          <div className="melo-masonry">
            {filtered.map(p => (
              <PerfumeCard key={p.id} p={p} onFlip={flip}
                onNoteClick={handleNoteClick} noteFilter={noteFilter}
                compareIds={compareIds} onCompare={compare}
                wardrobeIds={stats.wIds} onWardrobeToggle={wardrobeToggle} />
            ))}
          </div>
        )}
      </section>

      <section id="melo-blog" style={{ maxWidth: 1400, margin: "72px auto 0", padding: "0 24px 88px" }} aria-label="Blog">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 4, textTransform: "uppercase", color: "#C17F3A", marginBottom: 14 }}>✦ The Journal ✦</div>
          <h2 style={{ fontSize: "2.3rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810", marginBottom: 14, letterSpacing: "-.2px" }}>Fragrance Stories</h2>
          <p style={{ fontSize: 15, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.52)", maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>Deep dives into the world of scent — guides, reviews, and the stories behind the bottle.</p>
        </div>
        <div className="melo-blog-grid">{BLOGS.map(b => <BlogCard key={b.id} b={b} />)}</div>
      </section>

      <footer style={{ borderTop: "0.5px solid rgba(193,127,58,.2)", padding: "28px 32px", maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: "#C17F3A" }} aria-hidden="true">✦</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#C17F3A", fontWeight: 600 }}>Meloscent</span>
        </div>
        <span style={{ fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.38)" }}>© 2026 Meloscent · Fragrance Discovery</span>
        <nav aria-label="Social links" style={{ display: "flex", gap: 20 }}>
          {["Instagram", "Pinterest", "TikTok"].map(s => (
            <a key={s} href="#" onClick={e => e.preventDefault()} className="nav-link" style={{ fontSize: 13 }} rel="noopener">{s}</a>
          ))}
        </nav>
      </footer>

      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onAddToWardrobe={wardrobeToggle} />}
      <ProfileDrawer stats={stats} open={showProfile} onClose={() => setShowProfile(false)}
        onGoWardrobe={() => { setShowProfile(false); navigateTo("wardrobe") }} />
      <ComparePanel ids={compareIds} onClear={() => setCompareIds([])} />
      <Toast message={toast} />
    </div>
  )
}
