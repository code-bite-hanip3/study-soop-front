import styles from './PageHeader.module.css';
import iconSmile from '../../assets/icon_smile.svg';
import { Point } from '@/components/Point/Point';
import { NavButton } from '@/components/Button/NavButton';

function PageHeader() {
  return (
    <section className={styles.studyInfo}>
      <div className={styles.studyInfoHeader}>
        <div className={styles.studyInfoTopRow}>
          <div className={styles.emojiGroup}>
            <div className={styles.emojiWrapper}>
              <div className={styles.emoji}>👩🏻‍💻 37</div>
              <div className={styles.emoji}>👍🏻 11</div>
              <div className={styles.emoji}>🤩 9</div>
            </div>
            <div className={styles.addButton}>
              <img src={iconSmile} alt="스마일 아이콘" /> 추가
            </div>
          </div>
          <div className={styles.actionLinks}>
            <button className={styles.shareLink}>공유하기</button>
            <div className={styles.seperator}>|</div>
            <button className={styles.editLink}>수정하기</button>
            <div className={styles.seperator}>|</div>
            <button className={styles.deleteLink}>스터디 삭제하기</button>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.studyTitleRow}>
          <h2 className={styles.studyTitle}>연우의 개발공장</h2>
          <div className={styles.pageShiftGroup}>
            <NavButton size="type01" to="/habits">
              오늘의 습관
            </NavButton>
            <NavButton size="type01" to="/focus">
              오늘의 집중
            </NavButton>
          </div>
        </div>

        <div className={styles.studyInfoContent}>
          <div className={styles.description}>
            <div className={styles.descriptionLabel}>소개</div>
            <p className={styles.descriptionText}>
              Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)
            </p>
          </div>

          <div className={styles.pointGroup}>
            <div className={styles.pontLabel}>현재까지 획득한 포인트</div>
            <Point />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
