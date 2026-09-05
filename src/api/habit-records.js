// 습관 기록 API (④ 담당) 
import { http } from './client.js';

// GET /habit-records?studyId&from&to  (5.12)
export const fetchHabitRecords = async ({ studyId, from, to }) => {
  const res = await http.get(
    `/habit-records?studyId=${studyId}&from=${from}&to=${to}`,
  );
  return res.data;
};

// POST /habit-records  (5.18) { habitId, dateKey, isCompleted: true }
// 오늘 기록이 없을 때 "최초 체크"로 1건 생성. 같은 (habitId, dateKey) 재생성은 409.
export const createHabitRecord = async ({ habitId, dateKey, isCompleted = true }) => {
  const res = await http.post('/habit-records', { habitId, dateKey, isCompleted });
  return res.data;
};

// PATCH /habit-records/:recordId  (5.13) { isCompleted: true|false } — 체크/해제 토글
export const updateHabitRecord = async (recordId, isCompleted) => {
  const res = await http.patch(`/habit-records/${recordId}`, { isCompleted });
  return res.data;
};