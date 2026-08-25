// Amazon Associates is a separate program per marketplace, so each store needs
// its OWN tracking tag — a US tag earns nothing on amazon.co.uk or amazon.in.
// Set a per-market tag for each region you're approved in. The legacy single
// tag (VITE_AMAZON_AFFILIATE_TAG) is used as a fallback so existing setups keep
// working, but ideally set the per-market vars once you have all three accounts.
const MARKETS = {
  USD: { store: 'amazon.com',   tag: import.meta.env.VITE_AMAZON_TAG_US || 'meloscent88-20' },
  GBP: { store: 'amazon.co.uk', tag: import.meta.env.VITE_AMAZON_TAG_UK },
  INR: { store: 'amazon.in',    tag: import.meta.env.VITE_AMAZON_TAG_IN },
}

const FALLBACK_TAG = import.meta.env.VITE_AMAZON_AFFILIATE_TAG

export function getBuyUrl(brand, name, currency = 'USD') {
  const market = MARKETS[currency] || MARKETS.USD
  const tag    = market.tag || FALLBACK_TAG
  const q      = encodeURIComponent(`${brand} ${name} perfume`)
  const url    = `https://www.${market.store}/s?k=${q}`
  return tag ? `${url}&tag=${tag}` : url
}
