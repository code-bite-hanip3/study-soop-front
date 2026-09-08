import styles from './Modal.module.css';

export function Modal({children}){
  return(
    <>
      <div className={styles.wrapModal}>
        <div className={styles.mainModal}>
           <div className={styles.title}>{children}</div>
           <div className={styles.content}></div>
           <div className={styles.button}></div> 
        </div>
      </div>
    </>
  );
}