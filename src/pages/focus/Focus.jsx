import { useEffect, useRef, useState } from 'react';
import { RecordButton } from '@/components/Button/RecordButton';
import styles from './Focus.module.css';
import { CircleButton } from '@/components/Button/CircleButton';
import { Frame } from '@/components/Frame';
import { Layout } from '@/components/Layout';

function Focus() {
  const DEFAULT_MINUTES = 25;
  const ALERT_SECONDS = 60;

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(DEFAULT_MINUTES);
  // Status는 'READY', 'RUNNING', 'PAUSED' 세가지만 사용
  const [status, setStatus] = useState('READY');
  const [timerAlert, setTimerAlert] = useState(false);
  const intervalRef = useRef(null);

  const minutesToSeconds = (minutes) => minutes * 60;

  // 입력값 검증
  const validInputMinutes = (num) => {
    let n = Math.floor(Number(num));
    if (isNaN(num) || n <= 0) {
      n = DEFAULT_MINUTES;
    } else if (n > 99) {
      n = 60;
    }
    setInputMinutes(n);
    return n;
  };

  // 검증값 적용
  const calculateValidNum = (currentStatus) => {
    switch (currentStatus) {
      case 'READY': {
        const calculatedValidMinutes = validInputMinutes(inputMinutes);
        setInputMinutes(calculatedValidMinutes);
        setRemainingSeconds(minutesToSeconds(calculatedValidMinutes));
        break;
      }
      case 'PAUSED':
      case 'RUNNING': {
        setInputMinutes(DEFAULT_MINUTES);
        setRemainingSeconds(0);
        break;
      }
      default: {
        // 상태값 오류시 입력값 초기화
        setInputMinutes(0);
        setRemainingSeconds(0);
      }
    }
  };

  const clickStart = () => {
    if (status !== 'READY') return;
    calculateValidNum(status);
    setStatus('RUNNING');
  };

  const clickPause = () => {
    if (status === 'RUNNING') {
      setStatus('PAUSED');
    } else if (status === 'PAUSED') {
      setStatus('RUNNING');
    }
  };

  const clickCancel = () => {
    calculateValidNum(status);
    setStatus('READY');
  };

  // 1분 이하 빨간색
  const underOneMinute = (remainingSeconds) => {
    if (remainingSeconds >= ALERT_SECONDS) {
      setTimerAlert(false);
    } else if (remainingSeconds < ALERT_SECONDS) {
      setTimerAlert(true);
    }
  };

  // 화면에 보이는 숫자 계산
  const formatTime = (totalSeconds) => {
    const t = Number(totalSeconds);
    const minutes = String(Math.floor(t / 60));
    const seconds = String(t % 60);

    return `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
  };

  // 타이머
  useEffect(() => {
    if (status !== 'RUNNING') {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(
      () =>
        setRemainingSeconds((prev) => {
          const next = prev - 1;
          underOneMinute(next);
          if (next <= 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setStatus('READY');
            return 0;
          }
          return next;
        }),
      1000,
    );

    return () => clearInterval(intervalRef.current);
  }, [status]);

  return (
    <Layout>
      <Frame>
        <div className={styles.time}>{formatTime(remainingSeconds)}</div>
        <div>
          <input
            type="text"
            className={`${styles.input} ${timerAlert ? styles.timerAlert : ''}`}
            value={
              status !== 'READY' ? formatTime(remainingSeconds) : inputMinutes
            }
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setInputMinutes(value);
            }}
            disabled={status !== 'READY'}
            onBlur={() => setInputMinutes(validInputMinutes(inputMinutes))}
          />
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
  );
}

export default Focus;
