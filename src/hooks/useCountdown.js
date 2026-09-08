import { useEffect, useRef, useState } from 'react';

const DEFAULT_MINUTES = 25;
const ALERT_SECONDS = 60;

export function useCountdown() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(DEFAULT_MINUTES);
  // Status는 'READY', 'RUNNING', 'PAUSED' 세가지만 사용
  const [status, setStatus] = useState('READY');
  const [timerAlert, setTimerAlert] = useState(false);
  const intervalRef = useRef(null);

  const minutesToSeconds = (minutes) => minutes * 60;

  const acceptOnlyNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputMinutes(value);
  };

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

  const start = () => {
    if (status !== 'READY') return;
    calculateValidNum(status);
    setStatus('RUNNING');
  };

  const pause = () => {
    if (status === 'RUNNING') {
      setStatus('PAUSED');
    } else if (status === 'PAUSED') {
      setStatus('RUNNING');
    }
  };

  const cancel = () => {
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

  const value = {
    status,
    start,
    pause,
    cancel,
    remainingSeconds,
    timerAlert,
    setInputMinutes,
    validInputMinutes,
    inputMinutes,
    acceptOnlyNumber,
  };

  return value;
}
