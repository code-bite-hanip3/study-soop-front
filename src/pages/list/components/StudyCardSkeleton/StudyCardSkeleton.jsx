import styles from './StudyCardSkeleton.module.css';

export function StudyCardSkeleton({ count = 6, variant = 'grid' }) {
  return (
    <ul
      className={`${styles.skeletonList} ${variant === 'recent' ? styles.recentRow : styles.grid}`}
      aria-label="스터디 불러오는 중"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <li className={styles.item} key={index}>
          <div className={styles.card}>
            <div className={styles.thumbBlock} />
            <div className={styles.overlay}>
              <div className={styles.topRow}>
                <span className={`${styles.block} ${styles.titleBar}`} />
                <span className={`${styles.block} ${styles.pointBar}`} />
              </div>
              <span className={`${styles.block} ${styles.dayBar}`} />
              <span className={`${styles.block} ${styles.descBar}`} />
              <span className={`${styles.block} ${styles.descBarShort}`} />
              <div className={styles.reactions}>
                <span className={`${styles.block} ${styles.reactionPill}`} />
                <span className={`${styles.block} ${styles.reactionPill}`} />
                <span className={`${styles.block} ${styles.reactionPill}`} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default StudyCardSkeleton;