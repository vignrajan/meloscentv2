const STORES = {
  USD: 'amazon.com',
  GBP: 'amazon.co.uk',
  INR: 'amazon.in',
}

export function getBuyUrl(brand, name, currency = 'USD') {
  const tag   = import.meta.env.VITE_AMAZON_AFFILIATE_TAG
  const store = STORES[currency] || 'amazon.com'
  const q     = encodeURIComponent(`${brand} ${name} perfume`)
  const url   = `https://www.${store}/s?k=${q}`
  return tag ? `${url}&tag=${tag}` : url
}
