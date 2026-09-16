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

    try {
      await addReaction(studyId, emoji);
    } catch (err) {
      setReactions(previous);
      throw err;
    }
  };

  return { reactions, loading, error, react };
}
