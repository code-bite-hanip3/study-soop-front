import { timer } from '@/api/focusSessions';
import { useEffect, useRef, useState } from 'react';
import styles from './RecordList.module.css';

export function RecordList() {
  const [recordList, setRecordList] = useState([]);
  const [cursorId, setCursorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchingOnce = useRef(false); // 배포 이전에 삭제

  // 시간 변환
  function formatRecordDate(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }
  const getRecordList = async (cursorId = '') => {
    try {
      setIsLoading(true);
      const { recordList, nextCursor } = await timer.getRecordList(cursorId);
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
    if (fetchingOnce.current) return;
    fetchingOnce.current = true;
    getRecordList();
  }, []);

  return (
    <>
      <ul className={styles.recordList}>
        {recordList.map((record) => (
          <li key={record.id} className={styles.record}>
            <p>{formatRecordDate(record.updatedAt)}</p>
            <p>획득한 점수: {record.earnedPoint}점</p>
          </li>
        ))}
      </ul>
      <button
        className={styles.more}
        onClick={() => getRecordList(cursorId)}
        disabled={!cursorId || isLoading}
      >
        더보기
      </button>
    </>
  );
}
