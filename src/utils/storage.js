export const rLS = (k, d) => {
  try {
    const v = localStorage.getItem(k)
    return v == null ? d : JSON.parse(v)
  } catch {
    return d
  }
}

export const wLS = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {}
}

export const parsePx = (s) => parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0
