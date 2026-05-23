import { BLOGS } from '../data/blogs'

export default function BlogDetail({ blog, onBack }) {
  const related = BLOGS.filter(b => b.id !== blog.id).slice(0, 3)

  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 88px" }}>
      {/* Back button */}
      <div style={{ padding: "28px 0 0" }}>
        <button className="wd-back-btn" onClick={onBack}>← Back to Journal</button>
      </div>

      {/* Hero */}
      <div style={{ borderRadius: 24, overflow: "hidden", marginTop: 24, background: blog.gradient, position: "relative", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px 48px" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -40, bottom: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(0,0,0,.08)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", marginBottom: 14, padding: "4px 14px", borderRadius: 50, background: "rgba(0,0,0,.25)", color: "rgba(255,255,255,.92)", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .8 }}>
            {blog.category}
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "rgba(255,255,255,.97)", lineHeight: 1.2, maxWidth: 680, marginBottom: 16 }}>
            {blog.title}
          </h1>
          <div style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.6)", letterSpacing: .4 }}>
            {blog.readTime}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 720, margin: "52px auto 0" }}>
        <p style={{ fontSize: 18, fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "rgba(44,24,16,.65)", lineHeight: 1.75, marginBottom: 36, borderLeft: "3px solid #C17F3A", paddingLeft: 20 }}>
          {blog.excerpt}
        </p>
        {blog.content.map((para, i) => (
          <p key={i} style={{ fontSize: 16, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.75)", lineHeight: 1.85, marginBottom: 24 }}>
            {para}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 720, margin: "56px auto 0", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1, height: .5, background: "linear-gradient(90deg,transparent,rgba(193,127,58,.4))" }} />
        <span style={{ fontSize: 14, color: "#C17F3A" }}>✦</span>
        <div style={{ flex: 1, height: .5, background: "linear-gradient(90deg,rgba(193,127,58,.4),transparent)" }} />
      </div>

      {/* Related articles */}
      <div style={{ marginTop: 56 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#C17F3A", marginBottom: 10 }}>Continue Reading</div>
          <h2 style={{ fontSize: "1.8rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#2C1810" }}>More from the Journal</h2>
        </div>
        <div className="melo-blog-grid">
          {related.map(b => (
            <article key={b.id} className="blog-card" onClick={() => onBack(b)} style={{ cursor: "pointer" }}>
              <div style={{ height: 148, background: b.gradient, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -20, bottom: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
                <div style={{ position: "absolute", left: 20, top: 20, padding: "4px 12px", borderRadius: 50, background: "rgba(0,0,0,.25)", color: "rgba(255,255,255,.9)", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .7 }}>{b.category}</div>
              </div>
              <div style={{ padding: "22px 24px" }}>
                <h3 style={{ fontSize: 17, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810", lineHeight: 1.35, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.58)", lineHeight: 1.7, marginBottom: 18 }}>{b.excerpt}</p>
                <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: "#C17F3A" }}>Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
