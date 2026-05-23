const RATE = { USD: 1, GBP: 0.79, INR: 83.5 }
const SYM  = { USD: "$", GBP: "£", INR: "₹" }

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD" },
  { code: "GBP", symbol: "£", label: "GBP" },
  { code: "INR", symbol: "₹", label: "INR" },
]

export function fmt(usdAmount, currency = "USD") {
  const n = Number(usdAmount)
  if (usdAmount == null || isNaN(n)) return "—"
  const val = n * RATE[currency]
  const sym = SYM[currency]
  if (currency === "INR") return `${sym}${Math.round(val).toLocaleString("en-IN")}`
  const r = Math.round(val * 100) / 100
  return `${sym}${r % 1 === 0 ? r : r.toFixed(2)}`
}
