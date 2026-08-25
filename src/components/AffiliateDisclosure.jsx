// Required by the Amazon Associates Operating Agreement: a clear, conspicuous
// disclosure wherever affiliate links appear. Rendered on every view with buy links.
export default function AffiliateDisclosure({ style }) {
  return (
    <p style={{
      fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
      color: "rgba(44,24,16,.34)", textAlign: "center", lineHeight: 1.6,
      letterSpacing: .2, maxWidth: 640, margin: "0 auto", ...style,
    }}>
      As an Amazon Associate, Meloscent earns from qualifying purchases. Prices and
      availability shown are for guidance only and are subject to change on Amazon.
    </p>
  )
}
