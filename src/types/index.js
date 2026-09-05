// 공부의 숲 공용 타입 (api 응답 기준) — 팀이 백엔드와 동일하게 유지
// 백엔드 응답 형식: { success, data, message }

// Study
export const STUDY_BACKGROUND = {
  COLOR: 'COLOR',
  IMAGE: 'IMAGE',
};

// FocusSession
export const FOCUS_SESSION_STATUS = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};