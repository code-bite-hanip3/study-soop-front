import styles from './HabitOpenModal.module.css';
import { Modal } from '@/components/Modal';
import { useHabit } from '@/hooks/useHabit';
import { Button } from '@/components/Button/BasicButton/Button';
import { useEffect, useState } from 'react';
import { updateHabitBatch } from '@/api/habits';
import { useParams } from 'react-router';

export const HabitOpenModal = ({ onClose }) => {
  const MAX_HABIT_COUNT = 7;

  const { studyId } = useParams();

  const { habits, error } = useHabit(studyId);
  const [copyHabit, setCopyHabit] = useState([]); //사본
  const [removeHabit, setRemoveHabit] = useState([]); // 삭제 습관
  const [inputHabit, setInputHabit] = useState(''); //입력된 추가 습관
  // const [newHabit, setNewHabit ] = useState([]); // 최종 수정된 습관 목록

  const handleInputChange = (event) => {
    setInputHabit(event.target.value);
  };

  useEffect(() => {
    setCopyHabit(habits); //원본 카피 : 사본
  }, [habits]);

  useEffect(() => {
    if (error) {
      alert('데이터를 불러오지 못했습니다....ㅠ');
    }
  }, [error]);

  //사본에서 추가
  const handleAdd = () => {
    if (!inputHabit.trim()) return;

    //습관 이름 중복 확인 (공백, 대소문자 차이도 동일 습관으로 처리)
    const isSameHabit = copyHabit.find(
      (h) => h.name.trim().toLowerCase() === inputHabit.trim().toLowerCase(),
    );
    if (isSameHabit) {
      alert('이미 같은 습관이 있어요!');
      setInputHabit('');
      return;
    }

    // 하루 습관 개수 제한
    if (copyHabit.length >= MAX_HABIT_COUNT) {
      alert('작심삼일이 되고 싶습니까 휴먼...');
      setInputHabit(''); //클릭했을 때 공란으로 만들어줌
      return;
    } else {
      setCopyHabit((prev) => [
        ...prev,
        {
          id: `fake_${Date.now()}`, //FE에서 쓸 임시 id만 만들어둠 BE로 안보냄
          name: inputHabit.trim(),  //저장하는 시점에도 공백 제거
          isNew: true, //이걸로 추가된 걸 구분에서 BE로 보냄
        },
      ]);
    }

    setInputHabit('');
  };

  //Enter 키로 습관 목록 추가
  const handleKeyDown = (event) => {
    if (event.nativeEvent.isComposing) return;

    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  //사본에서 삭제
  const handleDelete = (habitId) => {
    const target = copyHabit.find((h) => h.id === habitId);
    setCopyHabit((prev) => prev.filter((h) => h.id !== habitId));

    if (!target?.isNew) {
      setRemoveHabit((prev) => [...prev, habitId]);
    }
  };

  //최종 BE로 보내는 기능
  const handleSubmit = async () => {
    try {
      const newHabitList = copyHabit.filter((h) => h.isNew);
      await updateHabitBatch(studyId, {
        removeHabit,
        newHabit: newHabitList.map((h) => ({ name: h.name })),
      });

      window.location.reload(); // 페이지 전체 새로고침
      // onComplete();
    } catch (error) {
      console.log(error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className={styles.title}>습관 목록</div>
        <div className={styles.habitListWrap}>
          <ul className={styles.habitList}>
            {copyHabit.map((habit) => (
              <li className={styles.editBox} key={habit.id}>
                <p className={styles.habitContent}>{habit.name}</p>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(habit.id)}
                ></button>
              </li>
            ))}
          </ul>
        </div>
        <input
          className={styles.inputValue}
          type="text"
          value={inputHabit}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="새로운 습관을 입력해보세요"
        />
        <button className={styles.editBtn} onClick={handleAdd}>
          +
        </button>
        <div className={styles.Buttons}>
          <Button size="type02" bgcolor="gray" onClick={onClose}>
            취소
          </Button>
          <Button size="type02" onClick={handleSubmit}>
            수정완료
          </Button>
        </div>
      </Modal>
    </>
  );
};
