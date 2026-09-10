import { useState } from 'react';
import styles from './ReactionList.module.css';


export function ReactionList({ reactions = [], onReact, variant = 'default', className = '' }) {
  const [items, setItems] = useState(reactions);

  
  const [prevReactions, setPrevReactions] = useState(reactions);
  if (reactions !== prevReactions) {
    setPrevReactions(reactions);
    setItems(reactions);
  }

  const handleClick = async (type) => {
    const target = items.find((item) => item.type === type);
    if (!target || target.hasReacted) return;

    const previous = items;
    setItems((prev) =>
      prev.map((item) =>
        item.type === type ? { ...item, count: item.count + 1, hasReacted: true } : item
      )
    );

    try {
      await onReact?.(type);
    } catch {
      setItems(previous);
    }
  };

  const listClass = `${styles.reactionList} ${variant === 'overlay' ? styles.overlay : ''} ${className}`.trim();

  return (
    <ul className={listClass}>
      {items.map((item) => (
        <li key={item.type}>
          <button
            type="button"
            className={styles.reactionPill}
            aria-pressed={item.hasReacted}
            disabled={item.hasReacted}
            onClick={() => handleClick(item.type)}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.count}
          </button>
        </li>
      ))}
    </ul>
  );
}