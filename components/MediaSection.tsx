'use client'

import { SHOW_INFO } from '@/data/members'

export default function MediaSection() {
  return (
    <section id="media" className="py-14 px-5 relative z-10" style={{ background: '#fff9f0' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <span
            className="font-gaegu text-lg text-white px-5 py-2 rounded-full"
            style={{ background: '#f4a7c3', boxShadow: '2px 3px 0 rgba(220,100,150,0.3)' }}
          >
            🎬 공연 미리보기
          </span>
        </div>

        {/* 유튜브 */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            border: '3px solid #fff',
            boxShadow: '4px 6px 0 rgba(244,167,195,0.35)',
            aspectRatio: '16/9',
            background: '#ffe0ee',
          }}
        >
          {SHOW_INFO.mainVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${SHOW_INFO.mainVideoId}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ color: '#c07090' }}>
              <span className="text-5xl opacity-40">▶</span>
              <p className="text-sm text-center px-4">
                mainVideoId에 유튜브 영상 ID를 입력해주세요<br />
                <span className="text-xs opacity-60">data/members.ts 수정</span>
              </p>
            </div>
          )}
        </div>

        {/* 사진 그리드 */}
        {SHOW_INFO.photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {SHOW_INFO.photos.map((url, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden card-hover"
                style={{
                  aspectRatio: '4/3',
                  border: '2.5px solid #fff',
                  boxShadow: '3px 4px 0 rgba(244,167,195,0.3)',
                  transform: i % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)',
                }}
              >
                <img src={url} alt={`공연 사진 ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map(i => (
              <div
                key={i}
                className="rounded-2xl flex items-center justify-center text-sm"
                style={{
                  aspectRatio: '4/3',
                  background: '#ffe0ee',
                  border: '2.5px solid #fff',
                  boxShadow: '3px 4px 0 rgba(244,167,195,0.3)',
                  color: '#c07090',
                  transform: i % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)',
                }}
              >
                📸 사진 {i} 교체
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
