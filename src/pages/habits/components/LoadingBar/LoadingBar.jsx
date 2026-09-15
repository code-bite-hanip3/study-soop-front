import styles from './LoadingBar.module.css';

export function LoadingBar() {
  return (
      <div className={styles.wrapper}>
        <div className={styles.text}>Loading...</div>
        <div className={styles.loadingBarOuter}>
          <div className={styles.loadingBar}></div>
        </div>
      </div>
  );
}
