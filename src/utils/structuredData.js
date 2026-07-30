// JSON-LD builders for rich blog posts (Article, FAQPage, BreadcrumbList).
// The site renders client-side, so these are injected into <head> at runtime
// by BlogDetail. Keep output shapes aligned with schema.org so Google can
// parse Article + FAQ rich results and Discover can read clean metadata.

const SITE = "https://www.meloscent.com"

const ORG = {
  "@type": "Organization",
  name: "Meloscent",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/og.png` },
}

// Posts are prerendered to real /blog/<slug> URLs at build time.
export function postUrl(post) {
  return post?.slug ? `${SITE}/blog/${post.slug}` : SITE
}

function abs(path) {
  if (!path) return `${SITE}/og.png`
  return path.startsWith("http") ? path : `${SITE}${path}`
}

export function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: [abs(post.heroImage)],
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: post.author
      ? { "@type": "Person", name: post.author, jobTitle: post.authorRole || undefined }
      : ORG,
    publisher: ORG,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl(post) },
    articleSection: post.category,
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : undefined,
  }
}

export function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  }
}

export function buildBreadcrumbSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "The Journal", item: `${SITE}/#melo-blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl(post) },
    ],
  }
}
