import { useEffect, useState } from 'react';
import { fetchHabitRecords } from '@/api/habit-records';
import { fetchHabits } from '@/api/habits';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export function useHabitTable(studyId) {
  const [habits, setHabits] = useState([]);
  const [habitRecords, setHabitRecords] = useState([]);
  const [error, setError] = useState(null);
  const weekStart = dayjs().startOf('isoWeek');
  const weekEnd = weekStart.add(6, 'day');

  useEffect(() => {
    const effectWeekStart = dayjs().startOf('isoWeek');
    const effectWeekEnd = effectWeekStart.add(6, 'day');

    const getHabitsAndRecords = async () => {
      try {
        const habitsData = await fetchHabits(studyId);
        setHabits(habitsData.habits);

        const recordsData = await fetchHabitRecords({
          studyId,
          from: effectWeekStart.format('YYYY-MM-DD'),
          to: effectWeekEnd.format('YYYY-MM-DD'),
        });
        setHabitRecords(recordsData.records);
      } catch (error) {
        setError(error.message);
      }
    };
    getHabitsAndRecords();
  }, [studyId]);

  return { habits, habitRecords, error, weekStart, weekEnd };
}
