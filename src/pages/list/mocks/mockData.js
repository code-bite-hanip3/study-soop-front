/**
 * 실제 API 명세(GET /studies/recent, GET /studies, POST /studies/:id/reactions)가
 * 완성되기 전까지 홈 화면을 목업 데이터로 개발하기 위한 파일입니다.
 * 나중에 axios 요청으로 교체할 때는 이 파일의 함수 시그니처(파라미터/응답 형태)만
 * 그대로 맞춰서 실제 요청 함수로 바꿔치기하면 됩니다.
 */

// 실제 서버 응답처럼 "약간의 지연"을 흉내내기 위한 딜레이 (요청 1회당 0.2초)
const MOCK_DELAY = 200;

function withDelay(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, MOCK_DELAY);
  });
}

// 카드 리액션(하단 pill) 아이콘은 스터디마다 다르게 노출됩니다.
// type: 리액션 클릭/중복 방지 판별용 고유 키
// hasReacted: "내가 이미 눌렀는지" 여부 (실제로는 로그인한 사용자 기준으로 서버가 내려줘야 함)

// 진행 일수(days)와 생성일(createdAt)을 같은 값에서 파생해
// "최근 순 = 먼저 시작한 지 얼마 안 된(진행 일수 적은) 스터디",
// "오래된 순 = 오래 진행 중인(진행 일수 많은) 스터디"가 되도록 맞추었습니다.
const START_OFFSET_MS = new Date(2026, 8, 30).getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

function buildStudy({ id, title, days, points, description, thumbnail, themeColor, reactions }) {
  return {
    id,
    title,
    points,
    dayLabel: `${days}일째 진행 중`,
    description,
    thumbnail,
    themeColor,
    createdAt: new Date(START_OFFSET_MS - days * DAY_MS).toISOString(),
    reactions: reactions.map((reaction) => ({ ...reaction })), // 카드별로 독립된 객체 보장
  };
}

// "스터디 둘러보기" 목록: 이미지 카드 18장 + 파스텔 카드 12장 = 총 30장 (모두 내용이 다릅니다)
const STUDY_POOL = [
  // ── 이미지 카드 1~6 (첫 바퀴) ──────────────────────────────
  buildStudy({
    id: 1,
    title: '밴프 새벽 감성 스터디',
    days: 12,
    points: 310,
    description: '매일 아침 산사진 한 장 찍고 공유해요',
    thumbnail: 'banff',
    reactions: [
      { type: 'member', icon: '👤', count: 37, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 26, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 14, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 2,
    title: '캘거리 스탬피드 문화 탐방',
    days: 25,
    points: 230,
    description: '캐나다 축제 문화를 팀원들과 함께 배워요',
    thumbnail: 'calgary',
    reactions: [
      { type: 'flag', icon: '🚩', count: 21, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 33, hasReacted: false },
      { type: 'member', icon: '👤', count: 18, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 3,
    title: '캔모어 산악 트래킹 기록',
    days: 37,
    points: 145,
    description: '주말마다 등산로 다녀와 코스 일기를 써요',
    thumbnail: 'canmore',
    reactions: [
      { type: 'heart', icon: '❤️', count: 42, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 15, hasReacted: false },
      { type: 'member', icon: '👤', count: 9, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 4,
    title: '한강 야경 러닝 크루',
    days: 48,
    points: 375,
    description: '퇴근 후 한강에서 5km 함께 달려요',
    thumbnail: 'hanGang',
    reactions: [
      { type: 'fire', icon: '🔥', count: 51, hasReacted: false },
      { type: 'member', icon: '👤', count: 28, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 20, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 5,
    title: '보랏빛 캔버스 아트 랩',
    days: 63,
    points: 198,
    description: '파스텔 톤 그림을 그리며 감성을 정리해요',
    thumbnail: 'listBack',
    reactions: [
      { type: 'quote', icon: '💬', count: 24, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 36, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 12, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 6,
    title: '샌프란시스코 여행 일본어 회화',
    days: 7,
    points: 88,
    description: '여행지에서 바로 쓸 실전 표현을 몰아 익혀요',
    thumbnail: 'sf',
    reactions: [
      { type: 'member', icon: '👤', count: 13, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 19, hasReacted: false },
      { type: 'flag', icon: '🚩', count: 7, hasReacted: false },
    ],
  }),
  // ── 이미지 카드 7~12 (두 번째 바퀴) ──────────────────────────
  buildStudy({
    id: 7,
    title: '산 너머 바다 포토 일기',
    days: 3,
    points: 62,
    description: '언덕 위 풍경을 매일 한 컷씩 남겨요',
    thumbnail: 'banff',
    reactions: [
      { type: 'heart', icon: '❤️', count: 22, hasReacted: false },
      { type: 'member', icon: '👤', count: 11, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 8, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 8,
    title: '로키 트레인 여행 계획 클럽',
    days: 54,
    points: 412,
    description: '철도로 떠나는 캐나다 일주 루트를 설계해요',
    thumbnail: 'calgary',
    reactions: [
      { type: 'flag', icon: '🚩', count: 30, hasReacted: false },
      { type: 'member', icon: '👤', count: 25, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 17, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 9,
    title: '해질녘 호수 오로라 크루',
    days: 66,
    points: 289,
    description: '오로라 시즌을 대비해 사진 촬영법을 공부해요',
    thumbnail: 'canmore',
    reactions: [
      { type: 'heart', icon: '❤️', count: 48, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 21, hasReacted: false },
      { type: 'quote', icon: '💬', count: 12, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 10,
    title: '강변 로드 자전거 기록',
    days: 19,
    points: 156,
    description: '한강 둔치 자전거 길 스탬프를 하나씩 채워요',
    thumbnail: 'hanGang',
    reactions: [
      { type: 'thumbsup', icon: '👍', count: 27, hasReacted: false },
      { type: 'member', icon: '👤', count: 14, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 10, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 11,
    title: '우주 별자리 그림 아틀리에',
    days: 40,
    points: 233,
    description: '작은 캔버스 안에 별밤을 그려 담아요',
    thumbnail: 'listBack',
    reactions: [
      { type: 'heart', icon: '❤️', count: 39, hasReacted: false },
      { type: 'quote', icon: '💬', count: 18, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 16, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 12,
    title: '골든게이트 브리지 야경 명소 투어',
    days: 82,
    points: 344,
    description: '아름다운 야경 명소를 지도에 하나씩 저장해요',
    thumbnail: 'sf',
    reactions: [
      { type: 'flag', icon: '🚩', count: 23, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 29, hasReacted: false },
      { type: 'member', icon: '👤', count: 20, hasReacted: false },
    ],
  }),
  // ── 이미지 카드 13~18 (세 번째 바퀴) ─────────────────────────
  buildStudy({
    id: 13,
    title: '친구들과 함께하는 로드트립',
    days: 91,
    points: 501,
    description: '산악 도로 여행을 위한 준비물 체크리스트를 공유해요',
    thumbnail: 'banff',
    reactions: [
      { type: 'member', icon: '👤', count: 32, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 27, hasReacted: false },
      { type: 'flag', icon: '🚩', count: 11, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 14,
    title: '혼자 떠나는 캐나다 배낭 여행',
    days: 8,
    points: 120,
    description: '구글맵으로 빛나는 코스를 직접 짜봐요',
    thumbnail: 'calgary',
    reactions: [
      { type: 'heart', icon: '❤️', count: 26, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 13, hasReacted: false },
      { type: 'quote', icon: '💬', count: 9, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 15,
    title: '반려견과 함께 걷는 산책 일기',
    days: 73,
    points: 267,
    description: '두 발보다 네 발이 먼저일 때의 산책 코스 모음',
    thumbnail: 'canmore',
    reactions: [
      { type: 'member', icon: '👤', count: 17, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 44, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 21, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 16,
    title: '한강 변 피크닉 준비 스터디',
    days: 16,
    points: 94,
    description: '돗자리와 샌드위치, 함께 챙기면 두 배 즐거워요',
    thumbnail: 'hanGang',
    reactions: [
      { type: 'fire', icon: '🔥', count: 15, hasReacted: false },
      { type: 'member', icon: '👤', count: 8, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 31, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 17,
    title: '파스텔 톤 일상 기록 모임',
    days: 59,
    points: 205,
    description: '매일의 소소한 순간을 연한 색으로 남겨요',
    thumbnail: 'listBack',
    reactions: [
      { type: 'quote', icon: '💬', count: 28, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 35, hasReacted: false },
      { type: 'member', icon: '👤', count: 10, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 18,
    title: 'SF 지하철 한 줄 여행기',
    days: 44,
    points: 177,
    description: '역마다 하나씩, 사진과 문장을 남기는 여행 수첩',
    thumbnail: 'sf',
    reactions: [
      { type: 'thumbsup', icon: '👍', count: 20, hasReacted: false },
      { type: 'flag', icon: '🚩', count: 14, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 18, hasReacted: false },
    ],
  }),
  // ── 파스텔 카드 19~30 ─────────────────────────────────────
  buildStudy({
    id: 19,
    title: '파이썬 알고리즘 조각 모음',
    days: 5,
    points: 134,
    description: '하루 한 조각씩 자료구조를 쉽게 배워요',
    themeColor: 'green',
    reactions: [
      { type: 'fire', icon: '🔥', count: 19, hasReacted: false },
      { type: 'member', icon: '👤', count: 22, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 12, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 20,
    title: '아침 30분 영어 회화 스파링',
    days: 11,
    points: 98,
    description: '커피 한 잔과 함께 오늘의 주제를 말해봐요',
    themeColor: 'yellow',
    reactions: [
      { type: 'member', icon: '👤', count: 15, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 18, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 6, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 21,
    title: '타입스크립트 타입 마스터반',
    days: 22,
    points: 251,
    description: 'any 대신 제네릭으로 이겨내는 법을 연구해요',
    themeColor: 'green',
    reactions: [
      { type: 'fire', icon: '🔥', count: 45, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 24, hasReacted: false },
      { type: 'quote', icon: '💬', count: 13, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 22,
    title: '책 한 권 완독하기 클럽',
    days: 29,
    points: 183,
    description: '한 달에 한 권, 같이 읽고 서평을 나눠요',
    themeColor: 'yellow',
    reactions: [
      { type: 'heart', icon: '❤️', count: 33, hasReacted: false },
      { type: 'quote', icon: '💬', count: 21, hasReacted: false },
      { type: 'member', icon: '👤', count: 9, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 23,
    title: '리액트 컴포넌트 설계 연구회',
    days: 33,
    points: 298,
    description: '재사용과 관심사 분리를 매주 고민해요',
    themeColor: 'green',
    reactions: [
      { type: 'fire', icon: '🔥', count: 36, hasReacted: false },
      { type: 'member', icon: '👤', count: 26, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 17, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 24,
    title: '일본어 왕초보 탈출기',
    days: 41,
    points: 161,
    description: '히라가나부터 시작해 드라마로 마무리해요',
    themeColor: 'yellow',
    reactions: [
      { type: 'member', icon: '👤', count: 19, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 12, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 27, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 25,
    title: '늦은 밤 루틴 지키기 반',
    days: 52,
    points: 217,
    description: '자는 시간을 약속하고 함께 지켜요',
    themeColor: 'green',
    reactions: [
      { type: 'heart', icon: '❤️', count: 40, hasReacted: false },
      { type: 'member', icon: '👤', count: 12, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 23, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 26,
    title: '매일 20분 홈트 챌린지',
    days: 61,
    points: 143,
    description: '런닝머신 없이, 요가매트 하나면 충분해요',
    themeColor: 'yellow',
    reactions: [
      { type: 'fire', icon: '🔥', count: 29, hasReacted: false },
      { type: 'member', icon: '👤', count: 16, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 11, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 27,
    title: 'SQL 쿼리 최적화 실험실',
    days: 68,
    points: 331,
    description: '인덱스의 세계에서 응답 시간을 줄여봐요',
    themeColor: 'green',
    reactions: [
      { type: 'fire', icon: '🔥', count: 24, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 19, hasReacted: false },
      { type: 'member', icon: '👤', count: 21, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 28,
    title: '클래식 음악 감상 메모',
    days: 76,
    points: 176,
    description: '들었던 곡과 감상을 한 줄씩 적어요',
    themeColor: 'yellow',
    reactions: [
      { type: 'heart', icon: '❤️', count: 37, hasReacted: false },
      { type: 'quote', icon: '💬', count: 14, hasReacted: false },
      { type: 'member', icon: '👤', count: 8, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 29,
    title: '포트폴리오 한 판 완성반',
    days: 84,
    points: 388,
    description: '내 작업을 남에게 보여줄 준비를 같이 해요',
    themeColor: 'green',
    reactions: [
      { type: 'fire', icon: '🔥', count: 41, hasReacted: false },
      { type: 'member', icon: '👤', count: 30, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 22, hasReacted: false },
    ],
  }),
  buildStudy({
    id: 30,
    title: '취미 삼아 조리기능사 도전',
    days: 95,
    points: 245,
    description: '플레이팅보다 맛이 먼저인 기록장',
    themeColor: 'yellow',
    reactions: [
      { type: 'quote', icon: '💬', count: 25, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 28, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 15, hasReacted: false },
    ],
  }),
];

/**
 * 최근 조회한 스터디 목록
 * 실제 응답 예: GET /studies/recent -> { studies: Study[] }
 */
export function fetchRecentStudies() {
  // 조회 이력이 없는 상태(빈 화면)를 보고 싶다면 아래 줄을 return withDelay([]); 로 바꿔서 확인
  return withDelay(STUDY_POOL.slice(0, 3));
}

/**
 * 스터디 둘러보기 목록 (검색 + 정렬 + 페이지네이션)
 * 실제 응답 예: GET /studies?keyword=&sort=&page=&pageSize=
 *   -> { studies: Study[], totalCount: number }
 *
 * @param {{ keyword?: string, sort?: 'recent'|'oldest'|'pointsDesc'|'pointsAsc', page?: number, pageSize?: number }} params
 */
export function fetchExploreStudies({
  keyword = '',
  sort = 'recent',
  page = 1,
  pageSize = 6,
} = {}) {
  let list = STUDY_POOL.filter((study) =>
    study.title.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  const sorted = [...list].sort((a, b) => {
    switch (sort) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'pointsDesc':
        return b.points - a.points;
      case 'pointsAsc':
        return a.points - b.points;
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const start = (page - 1) * pageSize;
  const studies = sorted.slice(start, start + pageSize);

  return withDelay({
    studies,
    totalCount: sorted.length,
  });
}

/**
 * 이모지 리액션 클릭
 * 실제 응답 예: POST /studies/:studyId/reactions  body: { type }
 *   -> { studyId, type, count, hasReacted: true }
 * 서버에서는 (studyId, userId, type) 조합으로 유니크 제약을 걸어서
 * 한 사람이 같은 이모지를 두 번 못 누르게 막아야 합니다. (여기서는 흉내만 냄)
 *
 * @param {{ studyId: number, type: string }} params
 */
export function postStudyReaction({ studyId, type }) {
  return withDelay({ studyId, type, hasReacted: true });
}