import styles from './Toast.module.css';
// 🚨
// 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
// 집중이 중단되었습니다.
// 🎉
// 50포인트를 획득했습니다!

export function Toast({ imoji, text }) {
  return (
    <div className={styles.toast}>
      <span className={styles.imoji}>{imoji}</span>
      <span>{text}</span>
    </div>
  );
}
