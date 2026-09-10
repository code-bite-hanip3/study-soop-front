import { http } from './client.js';

//  `/study/:${studyId}/focus-sessions/${focusSessionId}`

const start = async () => {
  const res = await http.post(`/focus-sessions`);
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

const getTotalCount = async () => {
  const res = await http.get(`/focus-sessions/total`);
  return res.data._sum;
};

const getRecordList = async (cursorId) => {
  const res = await http.get(`/focus-sessions`, {
    params: cursorId ? { cursorId } : {},
  });
  return res.data;
};

export const timer = {
  start,
  changeFocusStatus,
  cancel,
  getTotalCount,
  getRecordList,
};
