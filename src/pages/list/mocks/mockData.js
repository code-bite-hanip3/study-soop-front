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
const STUDY_POOL = [
  {
    id: 1,
    title: '박코드의 UX 스터디',
    points: 310,
    dayLabel: '62일째 진행 중',
    description: '고급 프로젝트 연구!!',
    thumbnail: 'listBack',
    reactions: [
      { type: 'member', icon: '👤', count: 37, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 26, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 14, hasReacted: false },
    ],
  },
  {
    id: 2,
    title: 'K.K. 의 UX 스터디',
    points: 230,
    dayLabel: '30일째 진행 중',
    description: '주강시님의 박진감 넘치는 Nextjs!',
    themeColor: 'green',
    reactions: [
      { type: 'flag', icon: '🚩', count: 37, hasReacted: false },
      { type: 'fire', icon: '🔥', count: 26, hasReacted: false },
      { type: 'heart', icon: '❤️', count: 14, hasReacted: false },
    ],
  },
  {
    id: 3,
    title: '순창이 의 개발공장',
    points: 50,
    dayLabel: '10일째 진행 중',
    description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
    themeColor: 'yellow',
    reactions: [
      { type: 'quote', icon: '💬', count: 12, hasReacted: false },
      { type: 'thumbsup', icon: '👍', count: 11, hasReacted: false },
      { type: 'sweat', icon: '😅', count: 9, hasReacted: false },
    ],
  },
];

// "스터디 둘러보기" 목록은 더보기(페이지네이션) 동작 확인용으로 넉넉하게 늘려서 생성
function buildExploreStudies(count = 30) {
  return Array.from({ length: count }, (_, i) => {
    const base = STUDY_POOL[i % STUDY_POOL.length];
    return {
      ...base,
      id: i + 1,
      points: base.points + i, // 정렬(포인트순) 테스트가 잘 보이도록 값 변형
      createdAt: new Date(2026, 8, 9 - i).toISOString(), // 최근/오래된 순 정렬용
      reactions: base.reactions.map((reaction) => ({ ...reaction })), // 카드별로 독립된 객체 보장
    };
  });
}

const EXPLORE_STUDIES = buildExploreStudies();

/**
 * 최근 조회한 스터디 목록
 * 실제 응답 예: GET /studies/recent -> { studies: Study[] }
 */
export function fetchRecentStudies() {
  // 조회 이력이 없는 상태(빈 화면)를 보고 싶다면 아래 줄을 return withDelay([]); 로 바꿔서 확인
  return withDelay(STUDY_POOL);
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
  let list = EXPLORE_STUDIES.filter((study) =>
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
