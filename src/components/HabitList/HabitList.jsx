import { useHabit } from '@/hooks/useHabit';
import styles from './HabitList.module.css';
// import { useParams } from 'react-router'; -> study페이지 완성되면 적용

export function HabitList() {
  const studyId = '27c6dfa6-d801-4c2b-90d2-d4b394c9dd64';
  const { habits, error } = useHabit(studyId);

  if (error) {
    alert('데이터를 불러오지 못했습니다....ㅠ');
  }

  return (
    <>
      {habits.map((habit) => (
        <li className={styles.habitContent} key={habit.id}>{habit.name}</li>
      ))}
    </>
  );
}
