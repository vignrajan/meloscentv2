import { supabase } from '../lib/supabase'
import { PERFUMES } from '../data/perfumes'

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
  if (!supabase) return PERFUMES
  const { data, error } = await supabase
    .from('perfumes')
    .select('*, dupes(*)')
    .order('id')
  if (error || !data?.length) return PERFUMES
  return data.filter(p => p.dupes?.length > 0).map(transform)
}
