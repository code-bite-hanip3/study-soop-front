// 집중 세션 API (⑤ 담당)
import { http } from './client.js';

const start = async (focusSessionId, durationSeconds) => {
  const res = await http.post(`/focus-sessions/${focusSessionId}`, {
    durationSeconds,
  });
  return res.data;
};

const changeFocusStatus = async (focusSessionId, status) => {
  const res = await http.patch(`/focus-sessions/${focusSessionId}`, {
    status,
  });
  return res.data;
};

const cancel = async (focusSessionId) => {
  const res = await http.delete(`/focus-sessions/${focusSessionId}`);
  return res.data;
};

export const timer = { start, changeFocusStatus, cancel };
