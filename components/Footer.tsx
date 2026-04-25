export default function Footer() {
  return (
    <footer
      className="text-center py-12 px-6 relative z-10"
      style={{ background: '#ede0ff', borderTop: '2px solid rgba(183,139,224,0.3)' }}
    >
      <div className="font-gaegu text-2xl font-bold mb-2" style={{ color: '#3a2e2e' }}>
        너나동 밴드 🎸
      </div>
      <p className="text-sm mb-1" style={{ color: '#7a6a6a' }}>우리의 음악, 당신과 함께</p>
      <a
        href="https://instagram.com/neonadong"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold"
        style={{ color: '#b78be0' }}
      >
        @neonadong
      </a>
      <p className="text-xs mt-4" style={{ color: '#b0a0b0' }}>
        2025 너나동 밴드 · All Rights Reserved
      </p>
    </footer>
  )
}
