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
        <div className={styles.time}>{formatTime(remainingSeconds)}</div>
        <div>
          <input
            type="text"
            className={`${styles.input} ${timerAlert ? styles.timerAlert : ''}`}
            value={
              status !== 'READY' ? formatTime(remainingSeconds) : inputMinutes
            }
            onChange={(e) => acceptOnlyNumber(e)}
            disabled={status !== 'READY'}
            onBlur={() => setInputMinutes(validInputMinutes(inputMinutes))}
          />
        </div>
        <section className={styles.button}>
          <div
            className={`${status === 'READY' ? styles.hidden : styles.pause}`}
            onClick={pause}
          >
            <CircleButton icon="pause" bgcolor="green" />
          </div>
          <div
            onClick={start}
            className={`${status === 'READY' ? styles.start : styles.disabled}`}
          >
            <RecordButton>Start!</RecordButton>
          </div>
          <div
            className={`${status === 'READY' ? styles.hidden : styles.cancel}`}
            onClick={cancel}
          >
            <CircleButton />
          </div>
        </section>
      </Frame>
    </Layout>
  );
}

export default Focus;
