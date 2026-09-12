import styles from './TotalPointChip.module.css';
import { useEffect, useRef, useState } from 'react';
import { timer } from '@/api/focusSessions';
import point_chip_imoji from '@/assets/point_chip_imoji.svg';
import { useParams } from 'react-router-dom';

export function TotalPointChip() {
  const [totalPoint, setTotalPoint] = useState(0);
  const { studyId } = useParams();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!studyId) return;

    let isMounted = true;

    const fetching = async () => {
      try {
        const { earnedPoint } = await timer.getTotalCount(studyId);

        if (isMounted) {
          setTotalPoint(earnedPoint);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 처음 마운트 되었을 때 - 없으면 20초 후 받아옴
    fetching();

    // 20초마다 반복
    intervalRef.current = setInterval(fetching(), 20000);

    return () => {
      isMounted = false;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [studyId]);

  return (
    <div className={styles.chip}>
      <img
        src={point_chip_imoji}
        alt="포인트 칩 이모지"
        className={styles.chipImoji}
      />
      <span>{totalPoint ?? 0}P 획득</span>
    </div>
  );
}
