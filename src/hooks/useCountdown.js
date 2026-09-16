import { timer } from '@/api/focusSessions.js';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
// import { useParams } from 'react-router';

const DEFAULT_MINUTES = 25;
const ALERT_SECONDS = 60;

export function useCountdown() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(DEFAULT_MINUTES);
  // Status는 'READY', 'RUNNING', 'PAUSED' 'COMPLETED'
  const [status, setStatus] = useState('READY');
  const [focusSessionId, setFocusSessionId] = useState(null);
  const intervalRef = useRef(null);
  const { studyId } = useParams();
  const [isStop, setIsStop] = useState(false);
  const [earnPoint, setEarnPoint] = useState(0);

  const minutesToSeconds = (minutes) => minutes * 60;

  const acceptOnlyNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputMinutes(value);
  };

  // 입력값 검증
  const validInputMinutes = (num) => {
    let n = Math.floor(Number(num));
    if (isNaN(n) || n <= 0) {
      n = DEFAULT_MINUTES;
    } else if (n > 60) {
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

  const addTime = (num) => {
    setInputMinutes((prev) => prev + Number(num));
  };

  const start = async () => {
    try {
      if (status !== 'READY') return;
      setEarnPoint(0);
      calculateValidNum(status);
      setStatus('RUNNING');
      const res = await timer.start(studyId);
      setFocusSessionId(res.id);
    } catch (error) {
      console.log(error);
      setStatus('READY');
    }
  };

  const pause = async () => {
    try {
      let nextStatus;
      if (status === 'RUNNING') {
        nextStatus = 'PAUSED';
        setStatus('PAUSED');
        setIsStop(true);
      } else if (status === 'PAUSED') {
        nextStatus = 'RUNNING';
        setStatus('RUNNING');
        setIsStop(false);
      }
      if (!focusSessionId) return;
      const res = await timer.changeFocusStatus(
        focusSessionId,
        nextStatus,
        studyId,
      );

      if (focusSessionId !== res.updatedResult.id) {
        throw new Error('해당 기록이 아닙니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = async () => {
    try {
      calculateValidNum(status);
      setStatus('READY');
      const res = await timer.cancel(focusSessionId, studyId);
      if (focusSessionId !== res.id) {
        throw new Error('해당 기록이 아닙니다.');
      }
      setFocusSessionId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // 1분 이하 빨간색
  const timerAlert =
    status === 'RUNNING' &&
    remainingSeconds > 0 &&
    remainingSeconds < ALERT_SECONDS;

  // 타이머
  useEffect(() => {
    if (status !== 'RUNNING') {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [status]);

  // 성공 처리
  useEffect(() => {
    if (status !== 'RUNNING' || remainingSeconds > 0) return;

    let ignore = false;

    const completeFocusSession = async () => {
      try {
        const res = await timer.changeFocusStatus(
          focusSessionId,
          'COMPLETED',
          studyId,
        );
        if (!ignore) setEarnPoint(res.updatedResult.earnedPoint);
      } catch (error) {
        console.log('성공 처리 실패', error);
      } finally {
        if (!ignore) {
          setStatus('READY');
          setFocusSessionId(null);
        }
      }
    };

    completeFocusSession();

    return () => (ignore = true);
  }, [remainingSeconds, status, focusSessionId, studyId]);

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
    isStop,
    earnPoint,
    addTime,
  };

  return value;
}
