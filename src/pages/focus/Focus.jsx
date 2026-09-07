import { useEffect, useRef, useState } from 'react';
import { RecordButton } from '@/components/Button/RecordButton';
import styles from './Focus.module.css';

function Focus() {
  const [count, setCount] = useState(0);
  const [mount, setMount] = useState(false);
  const [initNum, setInitNum] = useState(0);

  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const numCount = Number(totalSeconds); // 초
    const minutes = Math.floor(numCount / 60);
    const seconds = numCount % 60;
    console.log(minutes, seconds);

    return `${minutes} : ${seconds}`; // padstart()
  };

  const handleClick = () => {
    if (!mount) {
      setCount(initNum * 60);
    }
    setMount(!mount);
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
      </section>
      <div className={styles.time}>{formatTime(count)}</div>
      <div>
        <input
          type="number"
          className={styles.input}
          value={initNum}
          onChange={(e) => setInitNum(e.target.value)}
          disabled={mount}
        />
      </div>
    </>
  );
}

export default Focus;
