import styles from './MascotLoading.module.css';

const GROW_STEPS = ['🌱', '🌿', '🌳'];

export function MascotLoading({ size = 'default', message = '나무가 자라고 있어요...' }) {
  const isSm = size === 'sm';
  return (
    <div className={`${styles.mascot} ${isSm ? styles.mascotRow : ''}`}>
      <div className={`${styles.tree} ${isSm ? styles.sm : ''}`} aria-hidden="true">
        {GROW_STEPS.map((emoji, index) => (
          <span className={styles.step} key={index} style={{ animationDelay: `${index * 0.8}s` }}>
            {emoji}
          </span>
        ))}
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default MascotLoading;