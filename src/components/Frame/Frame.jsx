import styles from "./Frame.module.css";

export function Frame({ isNarrow = false, children }) {
  return <div className={isNarrow ? `${styles.frame} ${styles.narrow}` : styles.frame}>{children}</div>;
}
