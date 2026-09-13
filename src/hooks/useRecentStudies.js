import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recentStudies';
const MAX_RECENT = 3;

function readRecentIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

// 최근 조회한 스터디 id 기록 (localStorage 실기록 방식)
// 초기엔 빈 상태 → 카드 클릭 시 즉시 추가 + localStorage 기록 → 재진입 시 재조회
export function useRecentStudies() {
  const [recentIds, setRecentIds] = useState(readRecentIds);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
    } catch {
      // localStorage 접근 불가 시 조용히 무시
    }
  }, [recentIds]);

  const addRecentStudy = (id) => {
    setRecentIds((prev) => [id, ...prev.filter((prevId) => prevId !== id)].slice(0, MAX_RECENT));
  };

  return { recentIds, addRecentStudy };
}