// 스터디 API (③ 담당) 
import { http } from './client.js';

// GET /studies?q&sort&page&size
export const fetchStudies = async (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined),
  ).toString();
  const res = await http.get(`/studies${query ? `?${query}` : ''}`);
  return res.data;
};

// POST /studies  { creatorNickname, name, description, backgroundType, backgroundValue, password }
export const createStudy = async (studyData) => {
  const res = await http.post('/studies', studyData);
  return res.data;
};

// GET /studies/:studyId
export const fetchStudyDetail = async (studyId) => {
  const res = await http.get(`/studies/${studyId}`);
  return res.data;
};

// POST /studies/:studyId/reactions  { emoji }
export const addReaction = async (studyId, emoji) => {
  const res = await http.post(`/studies/${studyId}/reactions`, { emoji });
  return res.data;
};

// GET /studies/:studyId/reactions  → count 내림차순 이모지 순위 (상위 3개는 프론트에서 노출)
export const fetchReactions = async (studyId) => {
  const res = await http.get(`/studies/${studyId}/reactions`);
  return res.data;
};