import { timer } from '@/api/focusSessions';
import { useEffect, useState } from 'react';
import styles from './RecordList.module.css';
import dayjs from 'dayjs';
import { formatToRelativeTime } from '@/utils/koreaServerTime.js';

export function RecordList() {
  const [recordList, setRecordList] = useState([]);
  const [cursorId, setCursorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { studyId } = useParams();
  const studyId = '126d30dc-bf24-4a65-be40-951fb9d1d205';

  const getRecordList = async (cursorId = '') => {
    try {
      setIsLoading(true);
      const { nextCursor, recordList } = await timer.getRecordList(
        studyId,
        cursorId,
      );
      setCursorId(nextCursor ?? '');
      setRecordList((prev) => [...prev, ...recordList]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 처음
  useEffect(() => {
    let ignore = false;
    const getRecordList = async (cursorId = '') => {
      try {
        setIsLoading(true);
        const { nextCursor, recordList } = await timer.getRecordList(
          studyId,
          cursorId,
        );

        if (ignore) return;

        setCursorId(nextCursor ?? '');
        setRecordList((prev) => [...prev, ...recordList]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecordList();
    return () => {
      ignore = true;
    };
  }, [studyId]);

  return (
    <>
      <div className={styles.listTitle}>
        <p className={styles.point}>획득한 점수</p>
        <p className={styles.date}>날짜</p>
        <p className={styles.time}>경과 시간</p>
      </div>
      <ul className={styles.recordList}>
        {recordList.map((record) => (
          <li key={record.id} className={styles.record}>
            <span className={styles.recordRow}>{record.earnedPoint}점</span>
            <span className={styles.recordRow}>
              {dayjs(record.updatedAt).format('M월 D일 A h:mm')}
            </span>
            <span className={styles.recordRow}>
              {formatToRelativeTime(record.updatedAt)}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={styles.moreButton}
        onClick={() => getRecordList(cursorId)}
        disabled={!cursorId || isLoading}
      >
        더보기
      </button>
    </>
  );
}
