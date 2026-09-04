// 집중 세션 API (⑤ 담당) 
import { http } from './client.js';

// POST /focus-sessions  { studyId, durationSeconds }
export const createFocusSession = async (sessionData) => {
  const res = await http.post('/focus-sessions', sessionData);
  return res.data;
};

// PATCH /focus-sessions/:focusSessionId  { status: PAUSED|RUNNING|COMPLETED }
export const changeFocusStatus = async (focusSessionId, status) => {
  const res = await http.patch(`/focus-sessions/${focusSessionId}`, { status });
  return res.data;
};

// GET /point-histories?studyId
export const fetchPointHistories = async (studyId) => {
  const res = await http.get(`/point-histories?studyId=${studyId}`);
  return res.data;
};