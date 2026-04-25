'use client'

import { SHOW_INFO } from '@/data/members'

const items = [
  { icon: '📅', label: 'DATE', value: SHOW_INFO.date, sub: SHOW_INFO.time },
  { icon: '📍', label: 'VENUE', value: SHOW_INFO.venue, sub: SHOW_INFO.address },
  { icon: '🎫', label: 'TICKET', value: SHOW_INFO.ticket, sub: '별도 예매 불필요' },
  { icon: '📩', label: 'CONTACT', value: SHOW_INFO.instagram, sub: '인스타그램 DM' },
]

export default function InfoSection() {
  return (
    <section id="info" className="relative z-10 py-14 px-5" style={{ background: '#ede0ff' }}>
      {/* 위 물결 */}
      <div className="wavy-top -mt-14 mb-8">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 0 L0 0 Z" fill="#fff9f0" />
        </svg>
      </div>

      <div className="max-w-lg mx-auto">
        {/* 배지 */}
        <div className="flex justify-center mb-6">
          <span
            className="font-gaegu text-lg text-white px-5 py-2 rounded-full"
            style={{ background: '#b78be0', boxShadow: '2px 3px 0 rgba(130,80,180,0.3)' }}
          >
            🎪 공연 정보
          </span>
        </div>

        {/* 카드 */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#fffdf7',
            border: '2.5px solid #b78be0',
            boxShadow: '4px 6px 0 rgba(183,139,224,0.2)',
          }}
        >
          <div className="grid grid-cols-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-5 gap-2 card-hover"
                style={{
                  borderRight: i % 2 === 0 ? '1.5px dashed rgba(183,139,224,0.4)' : 'none',
                  borderBottom: i < 2 ? '1.5px dashed rgba(183,139,224,0.4)' : 'none',
                }}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-bold tracking-widest" style={{ color: '#b78be0' }}>
                  {item.label}
                </span>
                <span className="text-sm font-bold leading-snug" style={{ color: '#3a2e2e' }}>
                  {item.value}
                </span>
                <span className="text-xs" style={{ color: '#7a6a6a' }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 아래 물결 */}
      <div className="wavy-bottom -mb-14 mt-8">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0 C360 56 1080 56 1440 0 L1440 56 L0 56 Z" fill="#fff9f0" />
        </svg>
      </div>
    </section>
  )
}
