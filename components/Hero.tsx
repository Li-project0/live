'use client'

import { SHOW_INFO } from '@/data/members'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden"
      style={{ background: '#fff9f0' }}
    >
      {/* 배경 낙서 데코 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-8 left-6 text-3xl opacity-30 rotate-[-15deg]">⭐</span>
        <span className="absolute top-12 right-8 text-2xl opacity-25 rotate-[10deg]">🎵</span>
        <span className="absolute top-24 left-16 text-xl opacity-20 rotate-[-5deg]">♪</span>
        <span className="absolute bottom-32 left-8 text-2xl opacity-20 rotate-[12deg]">🌟</span>
        <span className="absolute bottom-20 right-10 text-3xl opacity-25 rotate-[-8deg]">✨</span>
        <span className="absolute top-1/3 right-6 text-xl opacity-20 rotate-[20deg]">♬</span>
        {/* 크레파스 원 */}
        <div className="absolute top-16 right-12 w-16 h-16 rounded-full opacity-10"
          style={{ background: '#f4a7c3', border: '3px solid #f4a7c3' }} />
        <div className="absolute bottom-40 left-4 w-12 h-12 rounded-full opacity-10"
          style={{ background: '#7dc98a', border: '3px solid #7dc98a' }} />
        <div className="absolute top-1/2 left-3 w-8 h-8 rounded-full opacity-10"
          style={{ background: '#f9d94e', border: '3px solid #f9d94e' }} />
      </div>

      {/* 상단 문구 */}
      <p
        className="font-gaegu text-lg mb-3 relative z-10"
        style={{ color: '#b78be0' }}
      >
        우리의 음악, 당신과 함께!
      </p>

      {/* 밴드명 */}
      <h1
        id="admin-trigger"
        className="font-gaegu font-bold relative z-10 mb-2 cursor-pointer select-none"
        style={{
          fontSize: 'clamp(52px, 16vw, 88px)',
          color: '#b78be0',
          lineHeight: 1.1,
          textShadow: '3px 3px 0 rgba(183,139,224,0.15)',
        }}
      >
        너나동 밴드
        {/* 노란 밑줄 */}
        <span
          className="absolute block h-2 rounded-full"
          style={{
            background: '#f9d94e',
            opacity: 0.7,
            bottom: -6,
            left: '10%',
            right: '10%',
            transform: 'rotate(-1deg)',
          }}
        />
      </h1>

      {/* 날짜 버블 */}
      <div
        className="relative inline-block font-gaegu text-lg mt-10 mb-8 px-6 py-3 z-10"
        style={{
          background: '#fffdf7',
          border: '2.5px solid #b78be0',
          borderRadius: 24,
          color: '#b78be0',
          boxShadow: '3px 3px 0 rgba(183,139,224,0.25)',
        }}
      >
        <span className="absolute -top-3 -left-3 text-lg">♪</span>
        6월 21일, 우리 무대에서 만나요!
        <span className="absolute -bottom-3 -right-3 text-base">♬</span>
      </div>

      {/* 공연 사진 */}
      <div className="relative max-w-sm w-full mx-auto mb-10 z-10">
        {/* 테이프 */}
        <div
          className="absolute -top-3 left-5 w-14 h-5 rounded z-10"
          style={{ background: 'rgba(249,217,78,0.65)', transform: 'rotate(-5deg)' }}
        />
        <div
          className="absolute -top-3 right-5 w-14 h-5 rounded z-10"
          style={{ background: 'rgba(249,217,78,0.65)', transform: 'rotate(5deg)' }}
        />
        <div
          className="rounded-2xl overflow-hidden flex items-center justify-center text-5xl"
          style={{
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #ede0ff, #ffe0ee)',
            border: '3px solid #fff',
            boxShadow: '4px 6px 0 rgba(183,139,224,0.3)',
            transform: 'rotate(-1deg)',
          }}
        >
          {/* 실제 사진이 있으면 img 태그로 교체 */}
          🎸
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className="flex gap-3 flex-wrap justify-center z-10">
        <button
          onClick={() => scrollTo('rsvp')}
          className="btn-crayon font-bold text-base px-8 py-4 rounded-full text-white"
          style={{
            background: '#b78be0',
            border: 'none',
            boxShadow: '0 4px 0 rgba(130,80,180,0.35)',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          참석 여부 알리기
        </button>
        <button
          onClick={() => scrollTo('media')}
          className="btn-crayon font-bold text-base px-8 py-4 rounded-full"
          style={{
            background: '#fffdf7',
            border: '2.5px solid #b78be0',
            color: '#b78be0',
            boxShadow: '0 4px 0 rgba(183,139,224,0.2)',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          공연 영상 보기
        </button>
      </div>
    </section>
  )
}
