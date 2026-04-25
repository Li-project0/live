'use client'

import { useState, useRef, useEffect } from 'react'
import { insertRsvp, fetchRsvp, RsvpRow } from '@/lib/supabase'
import { SHOW_INFO, ADMIN_PASSWORD } from '@/data/members'

type Attend = 'yes' | 'no' | 'maybe'

const ATTEND_OPTS = [
  { val: 'yes' as Attend,   icon: '😄', label: '참석할게요', color: '#7dc98a', bg: '#dff5e3', shadow: 'rgba(100,180,120,0.3)' },
  { val: 'no' as Attend,    icon: '😢', label: '불참할게요', color: '#f4a7c3', bg: '#ffe0ee', shadow: 'rgba(220,100,150,0.3)' },
  { val: 'maybe' as Attend, icon: '🤔', label: '미정이에요', color: '#f9d94e', bg: '#fffbd0', shadow: 'rgba(220,190,50,0.3)' },
]

const LABELS: Record<Attend, string> = { yes: '참석', no: '불참', maybe: '미정' }

export default function RsvpForm() {
  const [attend, setAttend] = useState<Attend | null>(null)
  const [name, setName] = useState('')
  const [count, setCount] = useState('1')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  // 깜짝 영상 모달
  const [surpriseOpen, setSurpriseOpen] = useState(false)

  // 관리자
  const [adminOpen, setAdminOpen] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [adminErr, setAdminErr] = useState(false)
  const [adminData, setAdminData] = useState<RsvpRow[] | null>(null)
  const tapRef = useRef(0)
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 10번 탭 감지 (밴드명에 붙이지만 여기서 이벤트 올라옴)
  useEffect(() => {
    const el = document.getElementById('admin-trigger')
    if (!el) return
    const handler = () => {
      tapRef.current++
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
      tapTimerRef.current = setTimeout(() => { tapRef.current = 0 }, 1500)
      if (tapRef.current >= 10) {
        tapRef.current = 0
        setAdminOpen(true)
      }
    }
    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [])

  const handleAttend = (val: Attend) => {
    setAttend(val)
    if (val === 'no') setTimeout(() => setSurpriseOpen(true), 400)
  }

  const handleSubmit = async () => {
    if (!attend) return alert('참석 여부를 선택해주세요!')
    if (!name.trim()) return alert('이름을 입력해주세요!')
    if (!count || Number(count) < 1) return alert('인원수를 입력해주세요!')
    setLoading(true)
    try {
      await insertRsvp({ name: name.trim(), count: Number(count), phone: phone || null, attend })
      setDone(true)
    } catch {
      alert('저장 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleAdminLogin = async () => {
    if (adminPw === ADMIN_PASSWORD) {
      try {
        const data = await fetchRsvp()
        setAdminData(data)
        setAdminErr(false)
      } catch {
        alert('데이터 로드 실패')
      }
    } else {
      setAdminErr(true)
      setAdminPw('')
      setTimeout(() => setAdminErr(false), 2000)
    }
  }

  const exportCSV = () => {
    if (!adminData?.length) return alert('응답이 없어요!')
    const rows = [['이름', '인원수', '연락처', '참석여부', '제출시간']]
    adminData.forEach(d => rows.push([
      d.name, String(d.count), d.phone ?? '', LABELS[d.attend],
      new Date(d.created_at).toLocaleString('ko-KR'),
    ]))
    const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = '너나동_참석현황.csv'
    a.click()
  }

  const yesCount  = adminData?.filter(d => d.attend === 'yes').length ?? 0
  const maybeCount = adminData?.filter(d => d.attend === 'maybe').length ?? 0
  const totalPeople = adminData?.filter(d => d.attend === 'yes').reduce((s, d) => s + d.count, 0) ?? 0

  const doneConfig = {
    yes:   { icon: '🎉', title: '기다릴게요!', sub: `${name}님, 6월 21일에 함께해요! 🎸` },
    no:    { icon: '💌', title: '아쉬워요 😢', sub: `${name}님이 보고 싶을 거예요. 꼭 다음엔 함께요 💜` },
    maybe: { icon: '🌙', title: '결정되면 알려주세요!', sub: `${name}님, 언제든 다시 제출해주세요!` },
  }

  return (
    <>
      <section id="rsvp" className="py-14 px-5 relative z-10" style={{ background: '#fff9f0' }}>
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center mb-6">
            <span
              className="font-gaegu text-lg text-white px-5 py-2 rounded-full"
              style={{ background: '#b78be0', boxShadow: '2px 3px 0 rgba(130,80,180,0.3)' }}
            >
              ⭐ 참석 여부
            </span>
          </div>
          <p className="text-center font-gaegu text-base mb-6" style={{ color: '#7a6a6a' }}>
            참석 여부를 알려주세요!
          </p>

          <div
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: '#fffdf7',
              border: '2.5px solid #b78be0',
              boxShadow: '4px 6px 0 rgba(183,139,224,0.2)',
            }}
          >
            {/* 상단 accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg,#b78be0,#f4a7c3,#7dc98a)' }} />

            {done && attend ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="text-6xl" style={{ animation: 'pop .5s cubic-bezier(.34,1.56,.64,1) both' }}>
                  {doneConfig[attend].icon}
                </div>
                <div className="font-gaegu text-2xl font-bold" style={{ color: '#3a2e2e' }}>
                  {doneConfig[attend].title}
                </div>
                <div className="text-sm" style={{ color: '#7a6a6a' }}>{doneConfig[attend].sub}</div>
              </div>
            ) : (
              <>
                {/* 참석 선택 */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {ATTEND_OPTS.map(o => (
                    <button
                      key={o.val}
                      onClick={() => handleAttend(o.val)}
                      className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl text-sm font-bold transition-all"
                      style={{
                        border: `2px solid ${attend === o.val ? o.color : 'rgba(0,0,0,0.08)'}`,
                        background: attend === o.val ? o.bg : '#fff',
                        color: '#3a2e2e',
                        boxShadow: attend === o.val ? `0 4px 0 ${o.shadow}` : '0 2px 0 rgba(0,0,0,0.06)',
                        fontFamily: '"Noto Sans KR", sans-serif',
                        transform: attend === o.val ? 'translateY(-2px)' : 'none',
                      }}
                    >
                      <span className="text-2xl">{o.icon}</span>
                      {o.label}
                    </button>
                  ))}
                </div>

                {/* 입력 필드 */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold tracking-wide" style={{ color: '#b78be0' }}>이름 *</label>
                    <input
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="홍길동" maxLength={20}
                      className="rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        background: '#f7f0ff', border: '1.5px solid rgba(183,139,224,0.3)',
                        color: '#3a2e2e', fontFamily: '"Noto Sans KR", sans-serif',
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold tracking-wide" style={{ color: '#b78be0' }}>인원수 *</label>
                    <input
                      type="number" value={count} onChange={e => setCount(e.target.value)}
                      min={1} max={20}
                      className="rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        background: '#f7f0ff', border: '1.5px solid rgba(183,139,224,0.3)',
                        color: '#3a2e2e', fontFamily: '"Noto Sans KR", sans-serif',
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mb-5">
                  <label className="text-xs font-bold tracking-wide" style={{ color: '#b78be0' }}>연락처 (선택)</label>
                  <input
                    type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="rounded-xl px-4 py-3 text-sm outline-none w-full"
                    style={{
                      background: '#f7f0ff', border: '1.5px solid rgba(183,139,224,0.3)',
                      color: '#3a2e2e', fontFamily: '"Noto Sans KR", sans-serif',
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 rounded-full font-bold text-base text-white btn-crayon"
                  style={{
                    background: '#b78be0',
                    border: 'none',
                    boxShadow: '0 4px 0 rgba(130,80,180,0.35)',
                    fontFamily: '"Noto Sans KR", sans-serif',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? '저장 중...' : '제출하기 ✈️'}
                </button>
                <p className="text-center text-xs mt-3" style={{ color: '#b0a0b0' }}>
                  💜 입력하신 내용은 관리자만 확인할 수 있습니다
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── 깜짝 영상 모달 ── */}
      {surpriseOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSurpriseOpen(false)}
        >
          <div
            className="rounded-3xl p-7 text-center max-w-sm w-full"
            style={{ background: '#fffdf7', border: '2.5px solid #f4a7c3', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-3">🎬</div>
            <div className="font-gaegu text-2xl font-bold mb-2" style={{ color: '#3a2e2e' }}>잠깐! 이거 보셨나요?</div>
            <p className="text-sm mb-4" style={{ color: '#7a6a6a' }}>못 오시더라도, 우리 무대 잠깐만 봐주세요 💜</p>
            <div
              className="rounded-xl overflow-hidden mb-5"
              style={{ aspectRatio: '16/9', background: '#ffe0ee' }}
            >
              {SHOW_INFO.surpriseVideoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${SHOW_INFO.surpriseVideoId}?autoplay=1`}
                  allow="autoplay; encrypted-media" allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm" style={{ color: '#c07090' }}>
                  surpriseVideoId 교체 필요
                </div>
              )}
            </div>
            <button
              onClick={() => setSurpriseOpen(false)}
              className="px-8 py-3 rounded-full font-bold text-white"
              style={{ background: '#f4a7c3', border: 'none', fontFamily: '"Noto Sans KR", sans-serif' }}
            >
              그래도 못 가요 😢
            </button>
          </div>
        </div>
      )}

      {/* ── 관리자 모달 ── */}
      {adminOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setAdminOpen(false)}
        >
          <div
            className="rounded-3xl p-7 max-w-sm w-full"
            style={{ background: '#fffdf7', border: '2.5px solid #b78be0' }}
            onClick={e => e.stopPropagation()}
          >
            {adminData === null ? (
              <>
                <div className="font-gaegu text-2xl font-bold mb-1" style={{ color: '#3a2e2e' }}>🔐 관리자 접근</div>
                <p className="text-sm mb-5" style={{ color: '#7a6a6a' }}>비밀번호를 입력하세요</p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="password" value={adminPw}
                    onChange={e => setAdminPw(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                    placeholder="비밀번호"
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ background: '#f7f0ff', border: '1.5px solid rgba(183,139,224,0.4)', color: '#3a2e2e' }}
                  />
                  <button
                    onClick={handleAdminLogin}
                    className="px-5 py-3 rounded-xl text-white font-bold text-sm"
                    style={{ background: '#b78be0', border: 'none', fontFamily: '"Noto Sans KR", sans-serif' }}
                  >확인</button>
                </div>
                {adminErr && <p className="text-xs mb-3" style={{ color: '#e05070' }}>❌ 비밀번호가 틀렸습니다</p>}
                <button
                  onClick={() => setAdminOpen(false)}
                  className="w-full py-2 rounded-full text-sm mt-2"
                  style={{ border: '1.5px solid rgba(183,139,224,0.4)', background: 'transparent', color: '#7a6a6a', fontFamily: '"Noto Sans KR", sans-serif' }}
                >닫기</button>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="font-gaegu text-xl font-bold" style={{ color: '#3a2e2e' }}>
                    총 {adminData.length}건의 응답
                  </div>
                  <button
                    onClick={exportCSV}
                    className="text-xs px-3 py-1.5 rounded-lg font-bold"
                    style={{ background: '#7dc98a', color: '#fff', border: 'none', fontFamily: '"Noto Sans KR", sans-serif' }}
                  >CSV</button>
                </div>

                {/* 통계 */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: '참석', num: yesCount, color: '#7dc98a' },
                    { label: '미정', num: maybeCount, color: '#f9d94e' },
                    { label: '예상인원', num: totalPeople, color: '#b78be0' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: '#f7f0ff' }}>
                      <div className="font-gaegu text-2xl font-bold" style={{ color: s.color }}>{s.num}</div>
                      <div className="text-xs" style={{ color: '#7a6a6a' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* 목록 */}
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto mb-4">
                  {adminData.length === 0
                    ? <p className="text-center text-sm py-8" style={{ color: '#7a6a6a' }}>아직 응답이 없어요 🎸</p>
                    : adminData.map(d => (
                      <div key={d.id} className="rounded-xl p-3" style={{ background: '#f7f0ff', border: '1px solid rgba(183,139,224,0.2)' }}>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm" style={{ color: '#3a2e2e' }}>{d.name}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{
                              background: d.attend === 'yes' ? '#dff5e3' : d.attend === 'no' ? '#ffe0ee' : '#fffbd0',
                              color: d.attend === 'yes' ? '#3a8a4a' : d.attend === 'no' ? '#b05070' : '#8a7010',
                            }}
                          >
                            {LABELS[d.attend]}
                          </span>
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#7a6a6a' }}>
                          {d.count}명{d.phone ? ` · ${d.phone}` : ''}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: '#b0a0b0' }}>
                          {new Date(d.created_at).toLocaleString('ko-KR')}
                        </div>
                      </div>
                    ))
                  }
                </div>

                <button
                  onClick={() => { setAdminOpen(false); setAdminData(null); setAdminPw('') }}
                  className="w-full py-2 rounded-full text-sm"
                  style={{ border: '1.5px solid rgba(183,139,224,0.4)', background: 'transparent', color: '#7a6a6a', fontFamily: '"Noto Sans KR", sans-serif' }}
                >닫기</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
