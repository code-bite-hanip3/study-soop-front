import styles from './Panel.module.css';

function Panel({ children }) {
  return <section className={styles.panel}>{children}</section>;
}

export default Panel;