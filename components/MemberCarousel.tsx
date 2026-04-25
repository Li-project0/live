'use client'

import { useEffect, useRef, useState } from 'react'
import { MEMBERS } from '@/data/members'

export default function MemberCarousel() {
  const [current, setCurrent] = useState(0)
  const autoRef = useRef<NodeJS.Timeout | null>(null)
  const startXRef = useRef(0)
  const count = MEMBERS.length
  const radius = Math.max(160, Math.round(count * 38))

  const goTo = (idx: number) => {
    setCurrent((idx + count) % count)
    resetAuto()
  }
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  const startAuto = () => { autoRef.current = setInterval(next, 3200) }
  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setCurrent(c => (c + 1) % count), 3200)
  }

  useEffect(() => {
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [])

  const rotateY = -(360 / count) * current

  return (
    <section id="members" className="py-14 px-5 relative z-10" style={{ background: '#ffe0ee' }}>
      {/* 위 물결 */}
      <div className="wavy-top -mt-14 mb-8">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 0 L0 0 Z" fill="#fff9f0" />
        </svg>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="flex justify-center mb-2">
          <span
            className="font-gaegu text-lg text-white px-5 py-2 rounded-full"
            style={{ background: '#f4a7c3', boxShadow: '2px 3px 0 rgba(220,100,150,0.3)' }}
          >
            🎸 멤버 소개
          </span>
        </div>
        <p className="text-center font-gaegu text-base mb-6" style={{ color: '#b07090' }}>
          좌우로 돌려서 멤버를 만나보세요 ✨
        </p>

        {/* 3D 캐러셀 */}
        <div
          className="relative mx-auto mb-4"
          style={{ height: 320, perspective: 800 }}
          onTouchStart={e => { startXRef.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const diff = startXRef.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
          }}
          onMouseDown={e => { startXRef.current = e.clientX }}
          onMouseUp={e => {
            const diff = startXRef.current - e.clientX
            if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 180,
              height: 260,
              left: '50%',
              top: '50%',
              transformStyle: 'preserve-3d',
              transform: `translateX(-50%) translateY(-50%) rotateY(${rotateY}deg)`,
              transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {MEMBERS.map((m, i) => {
              const angle = (360 / count) * i
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 180,
                    height: 260,
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: '#fffdf7',
                    border: '3px solid #fff',
                    boxShadow: '4px 6px 0 rgba(183,139,224,0.2)',
                    backfaceVisibility: 'hidden',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    cursor: 'pointer',
                  }}
                  onClick={() => goTo(i)}
                >
                  {/* 멤버 사진 or 이모지 */}
                  <div
                    className="w-full flex items-center justify-center"
                    style={{ height: 170, background: m.color, fontSize: 56 }}
                  >
                    {m.img
                      ? <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                      : m.emoji
                    }
                  </div>
                  <div className="p-3">
                    <div className="font-gaegu font-bold text-xl" style={{ color: '#3a2e2e' }}>{m.name}</div>
                    <div className="text-xs font-bold tracking-wide" style={{ color: '#b78be0' }}>{m.role}</div>
                    <div className="text-xs mt-1 leading-snug" style={{ color: '#7a6a6a' }}>{m.bio}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 네비 */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              border: '2.5px solid #b78be0', background: '#fffdf7', color: '#b78be0',
              boxShadow: '2px 3px 0 rgba(183,139,224,0.3)',
            }}
          >‹</button>

          <div className="flex gap-2">
            {MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? '#b78be0' : 'rgba(183,139,224,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              border: '2.5px solid #b78be0', background: '#fffdf7', color: '#b78be0',
              boxShadow: '2px 3px 0 rgba(183,139,224,0.3)',
            }}
          >›</button>
        </div>
        <p className="text-center font-gaegu text-sm mt-2" style={{ color: '#b07090' }}>
          터치/드래그로도 조작 가능 · 자동 회전 중
        </p>
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
