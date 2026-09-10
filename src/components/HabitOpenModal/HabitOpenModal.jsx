import styles from './HabitOpenModal.module.css';
import { Modal } from '../Modal';
import { useHabit } from '@/hooks/useHabit';
import { Button } from '../Button/BasicButton';
import { deleteHabit } from '@/api/habits';

export const HabitOpenModal = ({onClose}) => {
  const studyId = '27c6dfa6-d801-4c2b-90d2-d4b394c9dd64';
  const { habits, setHabits, error } = useHabit(studyId);

  if (error) {
    alert('데이터를 불러오지 못했습니다....ㅠ');
  }

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(studyId, habitId);
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    } catch (error) {
      console.log('삭제 API 통신 실패', error);
    }
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className={styles.title}>습관 목록</div>
        <ul className={styles.habitList}>
          {habits.map((habit) => (
            <div className={styles.editBox} key={habit.id}>
              <li className={styles.habitContent}>{habit.name}</li>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(habit.id)}
              ></button>
            </div>
          ))}
        </ul>
        <div className={styles.Buttons}>
          <Button size="type02" bgcolor="gray" onClick={onClose}>
            취소
          </Button>
          <Button size="type02">수정완료</Button>
        </div>
      </Modal>
    </>
  );
};
