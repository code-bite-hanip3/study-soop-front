import styles from './HabitOpenModal.module.css'
import { HabitList } from '../HabitList/HabitList';
import { Modal } from '../Modal';


export const HabitOpenModal = () => {
  return (
    <>
      <Modal>
        <div className={styles.title}>
          습관 목록
        </div>
        <ul className={styles.habitList}>
          <HabitList />
        </ul>
      </Modal>
    </>
  );
};
