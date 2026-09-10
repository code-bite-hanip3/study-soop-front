import { fetchHabits } from '@/api/habits';
import { useEffect, useState } from 'react';

export function useHabit(studyId) {
  const [habits, setHabits] = useState([]);

  
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHabits = async () => {
      try {
        const result = await fetchHabits(studyId);
        setHabits(result.habits);
      } catch (error) {
        setError(error.message)
      }
    };
    getHabits();
  }, [studyId]);

  return {habits, setHabits, error}; // habit의 상태를 바꿔주는 setHabits를 리턴에 추가 -> 다른 곳에서 사용할 수 있게
}
