import { supabase } from '../lib/supabase'
import { BLOGS } from '../data/blogs'

function transform(b) {
  return {
    id:       b.id,
    slug:     b.slug,
    category: b.category,
    title:    b.title,
    excerpt:  b.excerpt,
    gradient: b.gradient,
    readTime: b.read_time,
    content:  b.content,
    // Rich-post fields (nullable in older rows — renderer falls back gracefully)
    heroImage:       b.hero_image,
    heroAlt:         b.hero_alt,
    author:          b.author,
    authorRole:      b.author_role,
    authorBio:       b.author_bio,
    datePublished:   b.date_published,
    dateModified:    b.date_modified,
    tags:            b.tags,
    metaTitle:       b.meta_title,
    metaDescription: b.meta_description,
    body:            b.body,
  }
}

export async function fetchBlogs() {
  if (!supabase) return BLOGS
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error || !data?.length) return BLOGS
  return data.map(transform)
}
