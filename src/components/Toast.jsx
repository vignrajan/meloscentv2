export default function Toast({ message }) {
  if (!message) return null
  return (
    <div className="melo-toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}
