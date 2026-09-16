import { useEffect, useState } from 'react';
import { fetchReactions, addReaction } from '@/api/studies';

export function useReactions(studyId) {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchReactions(studyId);
        setReactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getReactions();
  }, [studyId]);

  const react = async (emoji) => {
    const existing = reactions.find((r) => r.emoji === emoji);
    const previous = reactions;

    // 1) 낙관적 업데이트: 서버 응답 기다리지 않고 화면 먼저 갱신
    if (existing) {
      setReactions((prev) =>
        prev
          .map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r))
          .sort((a, b) => b.count - a.count),
      );
    } else {
      setReactions((prev) =>
        [...prev, { emoji, count: 1 }].sort((a, b) => b.count - a.count),
      );
    }

    // 2) 실제 서버 요청
    try {
      await addReaction(studyId, emoji);
    } catch (err) {
      // 3) 실패하면 원래 상태로 롤백
      setReactions(previous);
      throw err; // 컴포넌트에서 실패 알림 처리할 수 있게 다시 던짐
    }
  };

  return { reactions, loading, error, react };
}
