// ✏️ 멤버 정보는 여기서만 수정하세요!
// img: 이미지 URL 또는 /public 폴더 경로 (예: '/members/sonnaun.jpg')
// img가 비어있으면 emoji가 표시됩니다

export type Member = {
  name: string
  role: string
  bio: string
  emoji: string
  img: string
  color: string // 카드 배경색
}

export const MEMBERS: Member[] = [
  {
    name: '손나은',
    role: 'Vocal',
    bio: '밴드의 목소리',
    emoji: '🎤',
    img: '',
    color: '#fff3d0',
  },
  {
    name: '김강',
    role: 'Drums',
    bio: '리듬의 심장',
    emoji: '🥁',
    img: '',
    color: '#dff5e3',
  },
  {
    name: '현종훈',
    role: 'Oneorring',
    bio: '기타의 영혼',
    emoji: '🎸',
    img: '',
    color: '#ffe0ee',
  },
  {
    name: '민석',
    role: 'Bass',
    bio: '저음의 대가',
    emoji: '🎸',
    img: '',
    color: '#dcefff',
  },
  {
    name: '도운',
    role: 'Keyboard',
    bio: '화음을 책임진다',
    emoji: '🎹',
    img: '',
    color: '#ede0ff',
  },
  {
    name: '지효',
    role: 'Guitar',
    bio: '멜로디를 수놓는다',
    emoji: '🎸',
    img: '',
    color: '#ffe8d6',
  },
]

// ✏️ 공연 정보도 여기서 수정하세요
export const SHOW_INFO = {
  date: '2025년 6월 21일 토요일',
  time: '오후 6:00',
  venue: '홍대 롤링홀',
  address: '서울 마포구 어울마당로 35',
  ticket: '전석 무료 · 자유석',
  instagram: '@neonadong',
  mainVideoId: '',      // 유튜브 영상 ID
  surpriseVideoId: '',  // 불참 시 깜짝 영상 ID
  photos: [] as string[], // 공연 사진 URL 배열
}

// ✏️ 관리자 비밀번호 (실제 배포 전 .env.local 에서 관리 권장)
export const ADMIN_PASSWORD = '1234'
