import { useEffect } from 'react'
import { BLOGS } from '../data/blogs'
import { buildArticleSchema, buildFaqSchema, buildBreadcrumbSchema } from '../utils/structuredData'

const COPPER = "#C17F3A"
const INK = "#2C1810"

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
const fmtDate = d => { const t = new Date(d); return isNaN(t) ? d : t.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }

// ── Small building blocks for rich posts ──────────────────────
function NotesRow({ label, items }) {
  if (!items?.length) return null
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 6, flexWrap: "wrap" }}>
      <span style={{ fontSize: 10, fontFamily: "'DM Sans',sans-serif", letterSpacing: 1.5, textTransform: "uppercase", color: COPPER, minWidth: 46 }}>{label}</span>
      <span style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map(n => (
          <span key={n} className="npill" style={{ background: "rgba(193,127,58,.1)", color: "#8b5a1a" }}>{n}</span>
        ))}
      </span>
    </div>
  )
}

function LinkBtn({ link, onInternalLink, className = "blog-ilink" }) {
  if (!link) return null
  return (
    <button className={className} onClick={() => onInternalLink?.(link)}>{link.label}</button>
  )
}

function renderBlock(block, i, onInternalLink) {
  switch (block.type) {
    case "callout":
      return (
        <div key={i} className="blog-callout" role="note">
          <span aria-hidden="true" style={{ color: COPPER }}>✦</span>
          <span>{block.text}</span>
        </div>
      )
    case "h2":
      return <h2 key={i} id={slugify(block.text)} className="blog-h2">{block.text}</h2>
    case "p":
      return <p key={i} className="blog-p">{block.text}</p>
    case "tldr":
      return (
        <aside key={i} className="blog-tldr" aria-label={block.title || "Summary"}>
          {block.title && <div className="blog-tldr-title">{block.title}</div>}
          <ul>
            {block.items.map((it, j) => (
              <li key={j}><strong>{it.label}:</strong> {it.text}</li>
            ))}
          </ul>
        </aside>
      )
    case "perfume":
      return (
        <article key={i} className="blog-perfume">
          <div className="blog-perfume-head">
            <span className="blog-perfume-rank" aria-hidden="true">{block.rank}</span>
            <div style={{ flex: 1 }}>
              <h3 className="blog-perfume-name">
                {block.name} <span className="blog-perfume-brand">{block.brand}</span>
              </h3>
              {block.bestFor && <span className="blog-bestfor">{block.bestFor}</span>}
            </div>
          </div>
          <p className="blog-p" style={{ marginBottom: 14 }}>{block.blurb}</p>
          {block.notes && (
            <div className="blog-notes">
              <NotesRow label="Top" items={block.notes.top} />
              <NotesRow label="Heart" items={block.notes.mid} />
              <NotesRow label="Base" items={block.notes.base} />
            </div>
          )}
          <LinkBtn link={block.link} onInternalLink={onInternalLink} />
        </article>
      )
    case "tips":
      return (
        <div key={i} className="blog-tips">
          {block.items.map((it, j) => (
            <div key={j} className="blog-tip">
              <div className="blog-tip-title">{it.title}</div>
              <p className="blog-p" style={{ marginBottom: 0 }}>{it.text}</p>
            </div>
          ))}
        </div>
      )
    case "faq":
      return (
        <div key={i} className="blog-faq">
          {block.items.map((it, j) => (
            <details key={j} className="blog-faq-item">
              <summary>{it.q}</summary>
              <p className="blog-p" style={{ margin: "10px 0 0" }}>{it.a}</p>
            </details>
          ))}
        </div>
      )
    case "related":
      return (
        <nav key={i} className="blog-related" aria-label={block.title || "Related reading"}>
          {block.title && <div className="blog-related-title">{block.title}</div>}
          <ul>
            {block.items.map((it, j) => (
              <li key={j}>
                <LinkBtn link={it} onInternalLink={onInternalLink} className="blog-related-link" />
              </li>
            ))}
          </ul>
        </nav>
      )
    default:
      return null
  }
}

export default function BlogDetail({ blog, onBack, blogs = BLOGS, onInternalLink }) {
  const related = blogs.filter(b => b.id !== blog.id).slice(0, 3)
  const isRich = Array.isArray(blog.body)

  // Inject JSON-LD (Article + Breadcrumb + FAQ) for rich posts only.
  useEffect(() => {
    if (!isRich) return
    const nodes = []
    const add = obj => {
      const s = document.createElement("script")
      s.type = "application/ld+json"
      s.dataset.melo = "blog-jsonld"
      s.text = JSON.stringify(obj)
      document.head.appendChild(s)
      nodes.push(s)
    }
    add(buildArticleSchema(blog))
    add(buildBreadcrumbSchema(blog))
    const faq = blog.body.find(b => b.type === "faq")
    if (faq) add(buildFaqSchema(faq.items))
    return () => nodes.forEach(n => n.remove())
  }, [blog, isRich])

  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 88px" }}>
      {/* Back button */}
      <div style={{ padding: "28px 0 0" }}>
        <button className="wd-back-btn" onClick={onBack}>← Back to Journal</button>
      </div>

      {/* Hero — real image for rich posts, gradient for legacy posts */}
      {isRich && blog.heroImage ? (
        <figure className="blog-hero-img" style={{ marginTop: 24 }}>
          <img src={blog.heroImage} alt={blog.heroAlt || blog.title} width="1200" height="675" loading="eager" decoding="async" />
          <figcaption>
            <span className="blog-hero-chip">{blog.category}</span>
            <h1 className="blog-hero-h1">{blog.title}</h1>
          </figcaption>
        </figure>
      ) : (
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
      )}

      {/* Article body */}
      <div style={{ maxWidth: 720, margin: "40px auto 0" }}>
        {/* Byline — rich posts surface author + dates for E-E-A-T */}
        {isRich && (
          <div className="blog-byline">
            <div className="blog-byline-row">
              {blog.author && <span className="blog-byline-author">By {blog.author}{blog.authorRole ? <span className="blog-byline-role"> · {blog.authorRole}</span> : null}</span>}
              <span className="blog-byline-meta">{blog.readTime}</span>
            </div>
            <div className="blog-byline-dates">
              {blog.datePublished && <time dateTime={blog.datePublished}>Published {fmtDate(blog.datePublished)}</time>}
              {blog.dateModified && blog.dateModified !== blog.datePublished && (
                <time dateTime={blog.dateModified}> · Updated {fmtDate(blog.dateModified)}</time>
              )}
            </div>
            {Array.isArray(blog.tags) && (
              <div className="blog-tags">
                {blog.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}
              </div>
            )}
          </div>
        )}

        {/* Lede */}
        <p style={{ fontSize: 18, fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "rgba(44,24,16,.65)", lineHeight: 1.75, margin: "28px 0 36px", borderLeft: `3px solid ${COPPER}`, paddingLeft: 20 }}>
          {blog.excerpt}
        </p>

        {isRich
          ? blog.body.map((b, i) => renderBlock(b, i, onInternalLink))
          : blog.content.map((para, i) => (
            <p key={i} style={{ fontSize: 16, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.75)", lineHeight: 1.85, marginBottom: 24 }}>
              {para}
            </p>
          ))}

        {isRich && blog.author && blog.authorBio && (
          <aside className="blog-author-card" aria-label="About the author">
            <div className="blog-author-avatar" aria-hidden="true">{blog.author.trim().charAt(0)}</div>
            <div>
              <div className="blog-author-name">{blog.author}</div>
              {blog.authorRole && <div className="blog-author-role">{blog.authorRole}</div>}
              <p className="blog-author-bio">{blog.authorBio}</p>
            </div>
          </aside>
        )}
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 720, margin: "56px auto 0", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1, height: .5, background: "linear-gradient(90deg,transparent,rgba(193,127,58,.4))" }} />
        <span style={{ fontSize: 14, color: COPPER }}>✦</span>
        <div style={{ flex: 1, height: .5, background: "linear-gradient(90deg,rgba(193,127,58,.4),transparent)" }} />
      </div>

      {/* Related articles */}
      <div style={{ marginTop: 56 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: COPPER, marginBottom: 10 }}>Continue Reading</div>
          <h2 style={{ fontSize: "1.8rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: INK }}>More from the Journal</h2>
        </div>
        <div className="melo-blog-grid">
          {related.map(b => (
            <article key={b.id} className="blog-card" onClick={() => onBack(b)} style={{ cursor: "pointer" }}>
              <div style={{ height: 148, background: b.gradient, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -20, bottom: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
                <div style={{ position: "absolute", left: 20, top: 20, padding: "4px 12px", borderRadius: 50, background: "rgba(0,0,0,.25)", color: "rgba(255,255,255,.9)", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: .7 }}>{b.category}</div>
              </div>
              <div style={{ padding: "22px 24px" }}>
                <h3 style={{ fontSize: 17, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: INK, lineHeight: 1.35, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: "rgba(44,24,16,.58)", lineHeight: 1.7, marginBottom: 18 }}>{b.excerpt}</p>
                <span style={{ fontSize: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: COPPER }}>Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
