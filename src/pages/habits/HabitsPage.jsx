import styles from './HabitsPage.module.css';
import { NavButton } from '@/components/Button/NavButton';
import { HabitList } from '@/components/HabitList/HabitList';
import { HabitOpenModal } from '@/components/HabitOpenModal';
import { useState } from 'react';

export function HabitsPage() {
  //모달창 열고 닫고 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nowDate = new Date().toLocaleString();

  return (
    <>
      <div className={styles.head}>
        <div className={styles.habitNav}>
          <h2>스터디 이름</h2>
          <div className={styles.habitBtns}>
            <NavButton size="type01">오늘의 습관</NavButton>
            <NavButton size="type02">홈</NavButton>
          </div>
        </div>
        <div className={styles.habitDate}>
          <p>현재시간</p>
          <div className={styles.date}>{nowDate}</div>
        </div>
      </div>
      <div className={styles.habitFrame}>
        <div className={styles.habitBox}>
          <div className={styles.todayHabit}>
            <div className={styles.spacer}>여백균형</div>
            <p>오늘의 습관</p>
            <button
              className={styles.listEdit}
              onClick={() => setIsModalOpen(true)}
            >
              목록수정
            </button>
          </div>
          <ul className={styles.habitList}>
            <HabitList />
          </ul>
        </div>
      </div>
      {/* 조건문으로 모달창이 열리고 닫히는걸 구현 */}
      {isModalOpen && <HabitOpenModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
export default HabitsPage;
