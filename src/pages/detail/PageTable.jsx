import { cx } from 'classix';
import styles from './PageTable.module.css';
import { stickerEmpty } from './constants/stickers';
import { getStickerByIndex } from './utils/getSticker';
import { useHabitTable } from '@/hooks/useHabitTable';

function PageTable({ studyId }) {
  const { habits, habitRecords, loading, error, weekStart, weekEnd } =
    useHabitTable(studyId);

  const yearMonth = weekStart.format('YYYY년 M월');
  const dateRange = `${weekStart.format('D일')} ~ ${weekEnd.format('D일')}`;
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    weekStart.add(index, 'day'),
  );
  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

  if (loading) {
    return (
      <section className={styles.habitTable}>
        <div className={styles.habitHeader}>
          <h2 className={styles.habitTitle}>습관 기록표</h2>
        </div>
        <div className={styles.emptyState}>
          습관 기록을 불러오는 중이에요...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.habitTable}>
        <div className={styles.habitHeader}>
          <h2 className={styles.habitTitle}>습관 기록표</h2>
        </div>
        <div className={styles.emptyState}>습관 기록을 불러오지 못했어요.</div>
      </section>
    );
  }

  if (habits.length === 0) {
    return (
      <section className={styles.habitTable}>
        <div className={styles.habitHeader}>
          <h2 className={styles.habitTitle}>습관 기록표</h2>
        </div>
        <div className={styles.emptyState}>
          아직 습관이 없어요.
          <br />
          오늘의 습관에서 습관을 생성해보세요.
        </div>
      </section>
    );
  }

  return (
    <section className={styles.habitTable}>
      <div className={styles.habitHeader}>
        <div className={styles.yearMonth}>{yearMonth}</div>
        <h2 className={styles.habitTitle}>습관 기록표</h2>
        <div className={styles.habitDate}>{dateRange}</div>
      </div>

      <div className={styles.rowWrapper}>
        <div className={styles.row}>
          <div className={styles.habitName}></div>
          {dayNames.map((day) => (
            <div className={cx(styles.cell, styles.day)} key={day}>
              {day}
            </div>
          ))}
        </div>

        {habits.map((habit, index) => {
          const activeSticker = getStickerByIndex(index);

          return (
            <div className={styles.row} key={habit.id}>
              <div className={styles.habitName}>{habit.name}</div>

              {weekDays.map((day) => {
                const dateKey = day.format('YYYY-MM-DD');
                const record = habitRecords.find(
                  (record) =>
                    record.habitId === habit.id && record.dateKey === dateKey,
                );

                return (
                  <div className={styles.cell} key={dateKey}>
                    <img
                      className={styles.sticker}
                      src={record?.isCompleted ? activeSticker : stickerEmpty}
                      alt="스티커"
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PageTable;
