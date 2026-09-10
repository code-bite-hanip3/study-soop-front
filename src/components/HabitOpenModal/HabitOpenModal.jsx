import styles from './HabitOpenModal.module.css';
import { Modal } from '../Modal';
import { useHabit } from '@/hooks/useHabit';
import { Button } from '../Button/BasicButton';
import { useEffect, useState } from 'react';

export const HabitOpenModal = ({ onClose }) => {
  const studyId = '27c6dfa6-d801-4c2b-90d2-d4b394c9dd64';

  const { habits, setHabits, error } = useHabit(studyId);
  const [ copyHabit, setCopyHabit ] = useState([]); //사본
  const [removeHabit, setRemoveHabit] = useState([]); // 삭제
  const [newHabit, setNewHabit ] = useState([]); // 추가

  const [inputHabit, setInputHabit] = useState('');

  const handleInputChange = (event) => {
    setInputHabit(event.target.value);
  }

  useEffect(() => {
    setCopyHabit(habits); //원본 카피 : 사본
  }, [habits]);


  if (error) {
    alert('데이터를 불러오지 못했습니다....ㅠ');
  }
  //사본에서 삭제
  const handleDelete = (habitId) => {
    setCopyHabit((prev) => prev.filter((h) => h.id !== habitId));
    
    setRemoveHabit((prev) => [...prev, habitId])
  };

  //사본에서 추가
  const handleAdd = () => {
    if(!newHabit.trim()) return;
    setCopyHabit((prev) => [...prev, 
      { id: `fake_${Date.now()}`,  //FE에서 쓸 임시 id만 만들어둠 BE로 안보냄
        name: newHabit, 
        isNew : true,   //이걸로 추가된 걸 구분에서 BE로 보냄
      }
    ]);

    setNewHabit('');
  }

  const handleSubmit = async () => {
    try {
      const newHabitList = copyHabit.filter((h) => h.isNew);

      await updateHabitBatch(studyId, {
        removeHabit, 
        newHabit: newHabitList.map((h) => ({name: h.name})),
      });

      onComplete();
    } catch (error) {
      console.log(error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className={styles.title}>습관 목록</div>
        <ul className={styles.habitList}>
          {copyHabit.map((habit) => (
            <div className={styles.editBox} key={habit.id}>
              <li className={styles.habitContent}>{habit.name}</li>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(habit.id)}
              ></button>
            </div>
          ))}
          <input 
          className={styles.inputValue} 
          type="text"
          onChange={(e) => {handleInputChange(e.target.value)}}
          placeholder='새로운 습관을 입력해보세요' />
          <button className={styles.editBtn} onClick={handleAdd}>+</button>
        </ul>
        <div className={styles.Buttons}>
          <Button size="type02" bgcolor="gray" onClick={onClose}>
            취소
          </Button>
          <Button 
          size="type02"
          onClick={handleSubmit}>수정완료</Button>
        </div>
      </Modal>
    </>
  );
};
