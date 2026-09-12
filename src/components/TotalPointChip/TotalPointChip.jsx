import styles from './TotalPointChip.module.css';
import { useEffect, useState } from 'react';
import { timer } from '@/api/focusSessions';
import point_chip_imoji from '@/assets/point_chip_imoji.svg';
import { useParams } from 'react-router-dom';

export function TotalPointChip() {
  const [totalPoint, setTotalPoint] = useState(0);
  const { studyId } = useParams();
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

    fetching();
    return () => {
      isMounted = false;
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
