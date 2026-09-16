import styles from './PageHeader.module.css';
import { Point } from '@/components/Point/Point';
import { NavButton } from '@/components/Button/NavButton';
import { StudyReactions } from './StudyReactions'; // 상단 import 추가

function PageHeader({ study, studyId }) {
  return (
    <section className={styles.studyInfo}>
      <div className={styles.studyInfoHeader}>
        <div className={styles.studyInfoTopRow}>
          <StudyReactions studyId={studyId} />
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
          <h2 className={styles.studyTitle}>
            {study?.name ?? '데이터를 불러오지 못했습니다'}
          </h2>
          <div className={styles.pageShiftGroup}>
            <NavButton size="type01" to={`/studies/${studyId}/habits`}>
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
              {study?.description ?? '데이터를 불러오지 못했습니다'}
            </p>
          </div>

          <div className={styles.pointGroup}>
            <div className={styles.pointLabel}>현재까지 획득한 포인트</div>
            <Point point={study?.pointTotal ?? 0} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
