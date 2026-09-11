import { useHabit } from '@/hooks/useHabit';
import { useEffect, useState } from 'react';
import { createHabitRecord, updateHabitRecord } from '@/api/habit-records';
import styles from './HabitList.module.css';
import { getTodayDate } from '@/utils/koreaServerTime';
// import { useParams } from 'react-router'; -> study페이지 완성되면 적용

export function HabitList() {
  const studyId = '27c6dfa6-d801-4c2b-90d2-d4b394c9dd64';
  const { habits, setHabits, error } = useHabit(studyId);

  //더블클릭 방지:먼저 클릭한 데이터의 habitId 추적
  const [pendingHabit, setPendingHabit] = useState(new Set());

  useEffect(() => {
    if (error) {
      alert('데이터를 불러오지 못했습니다....ㅠ');
    }
  }, [error]);

  //습관 목록 체크 기능 구현 habitRecord 속성 계속 변경
  const handleHabitToggle = async (habit) => {
    if (pendingHabit.has(habit.id)) {
      return;
    } // 더블클릭 되었을 때 if 문으로 방지 된다.

    setPendingHabit((prev) => new Set(prev).add(habit.id));

    // 분기 1) 첫 클릭 -> 처음 습관 완료:
    // post-> recordId = null 상태에서 post API로 생성됨/ isCompleted=true로 변경
    // 분기 2) 또 클릭 -> 완료한 걸 다시 해제:
    // patch-> recordId, !isCompleted 값을 넘겨준다. patch에서 업데이트

    try {
      let result;
      if (habit.recordId === null) {
        result = await createHabitRecord({
          habitId: habit.id,
          dateKey: getTodayDate(),
          isCompleted: true,
        });
      } else {
        result = await updateHabitRecord(habit.recordId, !habit.isCompleted);
      }

      //setHabits로 habits의 속성 값을 변경한다
      //map으로 습관들을 쭉 순회하면서 클릭한 습관의 habitId와
      //habits가 갖고 있는 습관 목록의 habitId가 동일하면 속성 변경
      setHabits((prev) =>
        prev.map((prevHabit) =>
          prevHabit.id === habit.id
            ? {
                ...prevHabit,
                recordId: result.id,
                isCompleted: result.isCompleted,
              }
            : prevHabit,
        ),
      );
    } catch (error) {
      console.log(error);
      alert('습관 기록을 불러오는데 실패했습니다.');
    } finally {
      setPendingHabit((prev) => {
        const value = new Set(prev);
        value.delete(habit.id);
        return value;
      });
    } //다음 클릭을 위해 붙여준 habit.id를 지워준다.
  };

  return (
    <>
      {habits.map((habit) => (
        <li
          className={
            habit.isCompleted ? styles.habitCompleted : styles.habitNotok
          }
          key={habit.id}
          onClick={() => handleHabitToggle(habit)}
        >
          {habit.name}
        </li>
      ))}
    </>
  );
}
