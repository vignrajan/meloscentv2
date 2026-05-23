export default function BlogCard({ b, onClick }) {
  return (
    <article className="blog-card" onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && onClick?.()} aria-label={`Read article: ${b.title}`}>
      <div style={{ height: 148, background: b.gradient, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, bottom: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
        <div style={{ position: "absolute", left: 20, top: 20, padding: "4px 12px", borderRadius: 50, background: "rgba(0,0,0,.25)", color: "rgba(255,255,255,.9)", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .7 }}>
          {b.category}
        </div>
      </div>
      <div style={{ padding: "22px 24px" }}>
        <h3 style={{ fontSize: 17, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#2C1810", lineHeight: 1.35, marginBottom: 10 }}>{b.title}</h3>
        <p style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.58)", lineHeight: 1.7, marginBottom: 18 }}>{b.excerpt}</p>
        <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: "#C17F3A" }}>Read More →</span>
      </div>
    </article>
  )
}
