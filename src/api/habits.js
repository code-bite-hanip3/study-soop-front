// 습관 API (④ 담당) 
import { http } from './client.js';

// GET /studies/:studyId/habits
export const fetchHabits = async (studyId) => {
  const res = await http.get(`/studies/${studyId}/habits`);
  return res.data;
};

// POST /studies/:studyId/habits  { name, order }
export const createHabit = async (studyId, habitData) => {
  const res = await http.post(`/studies/${studyId}/habits`, habitData);
  return res.data;
};

// PATCH /habits/:habitId  { name }
export const updateHabit = async (habitId, habitData) => {
  const res = await http.patch(`/habits/${habitId}`, habitData);
  return res.data;
};

// DELETE /habits/:habitId (소프트 삭제)
export const deleteHabit = async (studyId, habitId) => {
  const res = await http.delete(`/studies/${studyId}/habits/${habitId}`);
  return res.data;
};