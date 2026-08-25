import { supabase } from '../lib/supabase'
import { PERFUMES } from '../data/perfumes'
import perfumeImages from '../data/perfumeImages.json'

// Overlay a product image (id -> url) onto a perfume, if one is available.
// Populate src/data/perfumeImages.json via scripts/fetch-amazon-images.mjs.
// The card falls back to its gradient when no image is present.
function withImage(p) {
  if (p.image) return p
  const img = perfumeImages[p.id]
  if (!img) return p
  return { ...p, image: typeof img === 'string' ? img : img.image }
}

function transform(p) {
  const dupe = p.dupes?.[0]
  return {
    id:       p.id,
    designer: p.designer,
    name:     p.name,
    badge:    p.badge,
    mood:     p.mood,
    height:   p.card_height,
    retail:   p.retail_price,
    gradient: p.gradient,
    accent:   p.accent,
    textCol:  p.text_col,
    image:    p.image_url || undefined,
    notes: {
      top:  p.notes_top,
      mid:  p.notes_mid,
      base: p.notes_base,
    },
    dupe: dupe ? {
      brand: dupe.brand,
      name:  dupe.name,
      price: dupe.price_usd,
      match: dupe.match_score,
    } : null,
  }
}

export async function fetchPerfumes() {
  if (!supabase) return PERFUMES.map(withImage)
  const { data, error } = await supabase
    .from('perfumes')
    .select('*, dupes(*)')
    .order('id')
  if (error || !data?.length) return PERFUMES.map(withImage)
  return data.filter(p => p.dupes?.length > 0).map(transform).map(withImage)
}
