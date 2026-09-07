import { useEffect, useRef, useState } from 'react';
import { RecordButton } from '@/components/Button/RecordButton';
import styles from './Focus.module.css';
import { CircleButton } from '@/components/Button/CircleButton';

function Focus() {
  const [count, setCount] = useState(0);
  const [mount, setMount] = useState(false);
  const [initNum, setInitNum] = useState(25);

  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const numCount = Number(totalSeconds); // 초
    const minutes = String(Math.floor(numCount / 60));
    const seconds = String(numCount % 60);

    return `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
  };

  const handleClick = () => {
    if (!mount) {
      validInitNum(initNum);
      setCount(initNum * 60);
    }
    setMount(!mount);
  };

  const validInitNum = (num) => {
    const n = Math.floor(num);
    if (n <= 0) setInitNum(10);
    if (n > 99) setInitNum(99);
  };

  useEffect(() => {
    if (mount) {
      intervalRef.current = setInterval(
        () => setCount((prev) => Number(prev) - 1),
        1000,
      );
    } else if (!mount) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [mount]);

  return (
    <>
      <section onClick={handleClick}>
        <RecordButton>count buttons</RecordButton>
        <CircleButton></CircleButton>
      </section>
      <div className={styles.time}>{formatTime(count)}</div>
      <div>
        <input
          type="text"
          className={styles.input}
          value={mount ? formatTime(count) : initNum}
          onChange={(e) => setInitNum(e.target.value)}
          disabled={mount}
        />
      </div>
    </>
  );
}

export default Focus;
