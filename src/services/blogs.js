import { supabase } from '../lib/supabase'
import { BLOGS } from '../data/blogs'

function transform(b) {
  return {
    id:       b.id,
    category: b.category,
    title:    b.title,
    excerpt:  b.excerpt,
    gradient: b.gradient,
    readTime: b.read_time,
    content:  b.content,
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
