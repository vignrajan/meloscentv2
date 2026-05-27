import { useState, useEffect, useRef } from 'react'

export default function LazyCard({ p, index, children }) {
  const [visible, setVisible] = useState(index < 12)
  const ref = useRef(null)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '350px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible])

  if (visible) return children

  return (
    <div className="mcard-wrap" ref={ref} aria-hidden="true">
      <div style={{ height: p.height, borderRadius: 20, background: p.gradient, opacity: 0.4 }} />
    </div>
  )
}
