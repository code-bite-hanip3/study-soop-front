import { http } from './client.js';

const start = async (studyId) => {
  const res = await http.post(`/focus-sessions`, {
    studyId,
  });
  return res.data;
};

const changeFocusStatus = async (focusSessionId, status, studyId) => {
  const res = await http.patch(`/focus-sessions/${focusSessionId}`, {
    status,
    studyId,
  });
  return res.data;
};

const cancel = async (focusSessionId) => {
  const res = await http.delete(`/focus-sessions/${focusSessionId}`);
  return res.data;
};

const getTotalCount = async (studyId) => {
  const res = await http.get(`/focus-sessions/total`, {
    params: { studyId },
  });
  return res.data;
};

const getRecordList = async (studyId, cursorId) => {
  const res = await http.get(`/focus-sessions`, {
    params: { studyId, ...(cursorId ? { cursorId } : {}) },
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
