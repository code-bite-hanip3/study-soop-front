import styles from './TotalPointChip.module.css';
import { timer } from '@/api/focusSessions';
import point_chip_imoji from '@/assets/point_chip_imoji.svg';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

export function TotalPointChip() {
  const { studyId } = useParams();

  const { data } = useQuery({
    queryKey: ['totalPoint', studyId],
    queryFn: () => timer.getTotalCount(studyId),
    enabled: !studyId,
    refetchInterval: 20000,
  });

  const totalPoint = data?.earnedPoint ?? 0;

  return (
    <div className={styles.chip}>
      <img
        src={point_chip_imoji}
        alt="포인트 칩 이모지"
        className={styles.chipImoji}
      />
      <span>{totalPoint}P 획득</span>
    </div>
  );
}
