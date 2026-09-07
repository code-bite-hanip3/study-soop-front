import { useEffect, useRef, useState } from 'react';
import { RecordButton } from '@/components/Button/RecordButton';
import styles from './Focus.module.css';
import { CircleButton } from '@/components/Button/CircleButton';
import { Frame } from '@/components/Frame';
import { Layout } from '@/components/Layout';

function Focus() {
  // Status는 'READY', 'RUNNING', 'PAUSED',
  const [count, setCount] = useState(0);
  const [initNum, setInitNum] = useState(25);

  const [status, setStatus] = useState('READY');

  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const numCount = Number(totalSeconds); // 초
    const minutes = String(Math.floor(numCount / 60));
    const seconds = String(numCount % 60);

    return `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
  };

  const validInitNum = (num) => {
    const n = Math.floor(num);
    if (n <= 0) setInitNum(10);
    if (n > 99) setInitNum(99);
  };

  useEffect(() => {
    if (status === 'RUNNING') {
      intervalRef.current = setInterval(
        () => setCount((prev) => Number(prev) - 1),
        1000,
      );
    } else if (status !== 'RUNNING') {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [status]);

  const clickStart = () => {
    if (status !== 'READY') return;
    if (status === 'READY') {
      validInitNum(initNum);
      setCount(initNum * 60);
    }
    setStatus('RUNNING');
  };

  const clickPause = () => {
    if (status === 'RUNNING') {
      setStatus('PAUSED');
    } else if (status === 'PAUSED') {
      ///
      setStatus('RUNNING');
    }
  };

  const clickCancel = () => {
    if (status === 'RUNNING' || status === 'PAUSED') {
      setCount(0);
    }
    setStatus('READY');
  };

  return (
    <>
      <Layout>
        <Frame>
          <div className={styles.time}>{formatTime(count)}</div>
          <div>
            <input
              type="text"
              className={styles.input}
              value={status !== 'READY' ? formatTime(count) : initNum}
              onChange={(e) => setInitNum(e.target.value)}
              disabled={status !== 'READY'}
              onBlur={() => validInitNum(initNum)}
            />
            <p>{status !== 'READY' ? formatTime(count) : initNum}</p>
          </div>
          {/* button */}
          <section className={styles.button}>
            <div
              className={`${status === 'READY' ? styles.hidden : styles.pause}`}
              onClick={clickPause}
            >
              <CircleButton icon="pause" bgcolor="green" />
            </div>
            <div
              onClick={clickStart}
              className={`${status === 'READY' ? styles.start : styles.disabled}`}
            >
              <RecordButton>Start!</RecordButton>
            </div>
            <div
              className={`${status === 'READY' ? styles.hidden : styles.cancel}`}
              onClick={clickCancel}
            >
              <CircleButton />
            </div>
          </section>
        </Frame>
      </Layout>
    </>
  );
}

export default Focus;
