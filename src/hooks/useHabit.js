import { fetchHabits } from '@/api/habits';
import { useCallback, useEffect, useState } from 'react';

export function useHabit(studyId) {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getHabits = useCallback(async () => {
    setIsLoading(true);  //로딩 시작

    try {
      const result = await fetchHabits(studyId);
      setHabits(result.habits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    getHabits();
  }, [getHabits]);

  return { habits, setHabits, error, getHabits, isLoading }; // habit의 상태를 바꿔주는 setHabits를 리턴에 추가 -> 다른 곳에서 사용할 수 있게
}
