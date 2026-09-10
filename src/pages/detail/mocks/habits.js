export const mockHabits = [
  {
    id: 'habit_01',
    name: '미라클모닝 6시 기상',
    display_order: 0,
    records: {
      '2026-09-07': true,
      '2026-09-08': true,
      // 09-09(오늘)은 아직 체크 전이라 미포함
    },
  },
  {
    id: 'habit_02',
    name: '아침 챙겨 먹기',
    display_order: 1,
    records: {
      '2026-09-07': true,
      '2026-09-08': true,
      '2026-09-09': true,
    },
  },
  {
    id: 'habit_03',
    name: 'React 스터디 책 1챕터 읽기',
    display_order: 2,
    records: {
      '2026-09-07': true,
      // 08, 09일은 못 함
    },
  },
  {
    id: 'habit_04',
    name: '스트레칭',
    display_order: 3,
    records: {}, // 이번 주 아직 한 번도 안 함
  },
];
