import { useEffect, useState } from 'react';
import { fetchHabits } from '@/api/habits';
import { cx } from 'classix';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import styles from './PageTable.module.css';

import sticker01 from '../../assets/sticker/sticker_light_green_100_01.svg';
import sticker02 from '../../assets/sticker/sticker_light_green_100_02.svg';
import sticker03 from '../../assets/sticker/sticker_light_green_100_03.svg';
import sticker04 from '../../assets/sticker/sticker_light_mint_100_04.svg';
import sticker05 from '../../assets/sticker/sticker_light_mint_200_05.svg';
import sticker06 from '../../assets/sticker/sticker_green_06.svg';

import sticker07 from '../../assets/sticker/sticker_blue_100_07.svg';
import sticker08 from '../../assets/sticker/sticker_blue_200_08.svg';
import sticker09 from '../../assets/sticker/sticker_blue_300_09.svg';

import sticker10 from '../../assets/sticker/sticker_purple_100_10.svg';
import sticker11 from '../../assets/sticker/sticker_purple_200_11.svg';
import sticker12 from '../../assets/sticker/sticker_purple_300_12.svg';

import sticker13 from '../../assets/sticker/sticker_yellow_100_13.svg';
import sticker14 from '../../assets/sticker/sticker_yellow_200_14.svg';
import sticker15 from '../../assets/sticker/sticker_yellow_300_15.svg';

import sticker16 from '../../assets/sticker/sticker_pink_100_16.svg';
import sticker17 from '../../assets/sticker/sticker_pink_200_17.svg';
import sticker18 from '../../assets/sticker/sticker_pink_300_18.svg';

import stickerEmpty from '../../assets/sticker/sticker_empty.svg';
import { mockHabits, mockRecords } from './mocks/habits';

dayjs.extend(isoWeek);

const activeStickers = [
  sticker01,
  sticker02,
  sticker03,
  sticker04,
  sticker05,
  sticker06,
  sticker07,
  sticker08,
  sticker09,
  sticker10,
  sticker11,
  sticker12,
  sticker13,
  sticker14,
  sticker15,
  sticker16,
  sticker17,
  sticker18,
];

function PageTable({ studyId }) {
  console.log(studyId);
  // const [habits, setHabits] = useState([]);
  const [habits, setHabits] = useState(mockHabits);
  const [habitRecords, setHabitRecords] = useState(mockRecords);
  const weekStart = dayjs().startOf('isoWeek');
  const weekEnd = weekStart.add(6, 'day');
  const yearMonth = weekStart.format('YYYY년 M월');
  const dateRange = `${weekStart.format('D일')} ~ ${weekEnd.format('D일')}`;
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    weekStart.add(index, 'day'),
  );
  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

  // useEffect(() => {
  //   const getHabits = async () => {
  //     try {
  //       const data = await fetchHabits(studyId);
  //       console.log(data);
  //       setHabits(data.habits);
  //     } catch (error) {
  //       console.log('습관 목록을 불러오지 못했습니다.', error.message);
  //     }
  //   };
  //   getHabits();
  // }, [studyId]);

  return (
    <section className={styles.habitTable}>
      <div className={styles.habitHeader}>
        <div className={styles.yearMonth}>{yearMonth}</div>
        <h2 className={styles.habitTitle}>습관 기록표</h2>
        <div>{dateRange}</div>
      </div>

      {/* 헤더 행 */}
      <div className={styles.row}>
        <div className={styles.habitName}></div>
        {dayNames.map((day) => (
          <div className={cx(styles.cell, styles.day)} key={day}>
            {day}
          </div>
        ))}
      </div>

      {habits.map((habit, index) => {
        const activeSticker = activeStickers[index % activeStickers.length];

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
    </section>
  );
}

export default PageTable;
