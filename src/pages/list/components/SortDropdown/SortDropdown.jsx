import { useState, useRef, useEffect } from 'react';
import styles from './SortDropdown.module.css';

const OPTIONS = [
  { value: 'recent', label: '최근 순' },
  { value: 'oldest', label: '오래된 순' },
  { value: 'pointsDesc', label: '많은 포인트 순' },
  { value: 'pointsAsc', label: '적은 포인트 순' },
];

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0];

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        {current.label}
        <span className={styles.caret} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={styles.menuItem}
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
