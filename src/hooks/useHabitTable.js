import { useEffect, useState } from 'react';
import { fetchHabitRecords } from '@/api/habit-records';
import { fetchHabits } from '@/api/habits';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export function useHabitTable(studyId) {
  const [habits, setHabits] = useState([]);
  const [habitRecords, setHabitRecords] = useState([]);
  const [loading, setLoading] = useState(true); // 새로 추가 한 부분
  const [error, setError] = useState(null);
  const weekStart = dayjs().startOf('isoWeek');
  const weekEnd = weekStart.add(6, 'day');

  useEffect(() => {
    const effectWeekStart = dayjs().startOf('isoWeek');
    const effectWeekEnd = effectWeekStart.add(6, 'day');

    const getHabitsAndRecords = async () => {
      try {
        setLoading(true); // 새로 추가한 부분
        setError(null);

        const [habitsData, recordsData] = await Promise.all([
          fetchHabits(studyId),
          fetchHabitRecords({
            studyId,
            from: effectWeekStart.format('YYYY-MM-DD'),
            to: effectWeekEnd.format('YYYY-MM-DD'),
          }),
        ]);

        setHabits(habitsData.habits);
        setHabitRecords(recordsData.records);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // 성공하든 실패하든 무조건 로딩 종료
      }
    };
    getHabitsAndRecords();
  }, [studyId]);

  return { habits, habitRecords, loading, error, weekStart, weekEnd };
}
