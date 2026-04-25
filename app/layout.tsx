import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '너나동 밴드 — 6월 21일 공연 초대',
  description: '우리의 음악, 당신과 함께! 2025년 6월 21일 홍대 롤링홀',
  openGraph: {
    title: '너나동 밴드 공연 초대 🎸',
    description: '6월 21일 토요일 오후 6시 · 홍대 롤링홀 · 전석 무료',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#fff9f0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Gaegu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
