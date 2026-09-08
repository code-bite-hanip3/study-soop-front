import styles from './Focus.module.css';
import { Layout } from '@/components/Layout';
import { Frame } from '@/components/Frame';
import { RecordButton } from '@/components/Button/RecordButton';
import { CircleButton } from '@/components/Button/CircleButton';
import { useCountdown } from '@/hooks/useCountdown.js';

// 화면에 보이는 숫자 계산
const formatTime = (totalSeconds) => {
  const t = Number(totalSeconds);
  const minutes = String(Math.floor(t / 60));
  const seconds = String(t % 60);

  return `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
};

function Focus() {
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
            <p className={styles.content}>오늘의 집중</p>
            <input
              type="text"
              className={`${styles.timerInput} ${timerAlert ? styles.timerAlert : ''}`}
              value={
                status !== 'READY' ? formatTime(remainingSeconds) : inputMinutes
              }
              onChange={(e) => acceptOnlyNumber(e)}
              disabled={status !== 'READY'}
              onBlur={() => setInputMinutes(validInputMinutes(inputMinutes))}
              placeholder="00:00"
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
        </div>
      </Frame>
    </Layout>
  );
}

export default Focus;
