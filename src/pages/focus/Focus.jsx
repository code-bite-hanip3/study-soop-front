import styles from './Focus.module.css';
import { Layout } from '@/components/Layout';
import { Frame } from '@/components/Frame';
import { RecordButton } from '@/components/Button/RecordButton';
import { CircleButton } from '@/components/Button/CircleButton';
import { useCountdown } from '@/hooks/useCountdown.js';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Toast } from '@/components/Toast';

// 화면에 보이는 숫자 계산
const formatTime = (totalSeconds) => {
  const t = Number(totalSeconds);
  const minutes = String(Math.floor(t / 60));
  const seconds = String(t % 60);

  return `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
};

const formatInitMinutes = (num) => {
  const t = Number(num * 60);
  const minutes = String(Math.floor(t / 60));
  const seconds = String(t % 60);

  return `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
};

function Focus() {
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setInputMinutes(validInputMinutes(inputMinutes));
  };

  const {
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
    getTotalCount,
    getRecordList,
  } = useCountdown();

  return (
    <Layout>
      <Frame>
        <section className={styles.intro}>
          <div className={styles.title}>
            <p className={styles.userTitle}>연우의 개발공장</p>
            <div className={styles.linkTag}>오늘의 습관</div>
            <div className={styles.linkTag}>홈</div>
          </div>
          <div className={styles.pointText}>현재까지 획득한 포인트</div>
          <div className={styles.earnedPoint}>🍀310P 획득</div>
        </section>
        <div className={styles.wrapper}>
          <section className={styles.timer}>
            {/* <Modal>
              <div onClick={getTotalCount} className={styles.test1}>
                <CircleButton />
              </div>
              <div onClick={getRecordList} className={styles.test1}>
                <CircleButton />
              </div>
            </Modal> */}
            <p className={styles.content}>오늘의 집중</p>
            <input
              type="text"
              className={`${styles.timerInput} ${timerAlert ? styles.timerAlert : ''}`}
              value={
                status !== 'READY'
                  ? formatTime(remainingSeconds)
                  : isEditing
                    ? inputMinutes
                    : formatInitMinutes(inputMinutes)
              }
              onChange={(e) => acceptOnlyNumber(e)}
              disabled={status !== 'READY'}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </section>
          <section className={styles.button}>
            <div
              className={`${status === 'READY' ? styles.hidden : styles.pause}`}
              onClick={pause}
            >
              <CircleButton
                icon={`${status === 'RUNNING' ? 'pause' : 'restart'}`}
                bgcolor="green"
              />
            </div>
            <div
              onClick={start}
              className={`${status === 'READY' ? styles.start : styles.disabled}`}
            >
              <RecordButton disabled={status !== 'READY' ? true : false}>
                Start!
              </RecordButton>
            </div>
            <div
              className={`${status === 'READY' ? styles.hidden : styles.cancel}`}
              onClick={cancel}
            >
              <CircleButton />
            </div>
          </section>
          <Toast imoji={'🚨'} text={'집중이 중단되었습니다.'} />
        </div>
      </Frame>
    </Layout>
  );
}

export default Focus;
