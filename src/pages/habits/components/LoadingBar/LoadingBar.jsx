import styles from './LoadingBar.module.css';
import { ProgressBar } from 'basic-loading';

export function LoadingBar() {
  const option = {
    width: 300,
    speed: 3,
  };
  return (
    <>
      <div className={styles.loadingText}>Loading...</div>
      <ProgressBar option={option} />
    </>
  );
}
