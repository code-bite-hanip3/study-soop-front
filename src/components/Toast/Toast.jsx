// 🚨
// 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
// 집중이 중단되었습니다.
// 🎉
// 50포인트를 획득했습니다!

// 사용 예시:
// (value && <Toast text={비밀번호가 일치하지 않습니다. 다시 입력해주세요.} imoji={🚨} className={styles.customPosition} />)

import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export function Toast({ imoji, text, variant, className = '' }) {
  const [isToast, setIsToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsToast(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isToast) return null;

  return (
    <div
      className={`${styles.toast} ${variant ? styles[variant] : ''} ${className}`}
    >
      <span className={styles.imoji}>{imoji}</span>
      <span>{text}</span>
    </div>
  );
}
