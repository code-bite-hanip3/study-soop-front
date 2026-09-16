import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './PageHeader.module.css';
import { Point } from '@/components/Point/Point';
import { NavButton } from '@/components/Button/NavButton';
import { passwordModal as PasswordModal } from '@/components/PasswordModal';
import { getPassword, setPassword as setCachedPassword } from '@/api/client';
import { StudyReactions } from './StudyReactions';

const VERIFIED_STUDY_KEY = 'verifiedStudyId';
const CACHE_ALLOWED_ACTIONS = new Set(['habit', 'focus']);

function PageHeader({ study, studyId }) {
  const navigate = useNavigate();
  const [pendingAction, setPendingAction] = useState(null);

  const runAction = (action) => {
    switch (action.type) {
      case 'edit':
        navigate(`/studies/${studyId}/edit`);
        break;
      case 'delete':
        // TODO: 다음 PR 때 연결
        navigate('/');
        break;
      case 'habit':
        navigate(`/studies/${studyId}/habits`);
        break;
      case 'focus':
        navigate(`/studies/${studyId}/focus`);
        break;
      default:
        break;
    }
  };

  const isVerifiedForThisStudy = () => {
    return (
      getPassword() && localStorage.getItem(VERIFIED_STUDY_KEY) === studyId
    );
  };

  const handleProtectedAction = (action) => {
    if (CACHE_ALLOWED_ACTIONS.has(action.type) && isVerifiedForThisStudy()) {
      runAction(action);
      return;
    }
    setPendingAction(action);
  };

  const MODAL_CONFIG = {
    edit: { mode: 'edit', confirmLabel: undefined },
    delete: { mode: 'delete', confirmLabel: undefined },
    habit: { mode: 'edit', confirmLabel: '오늘의 습관으로 가기' },
    focus: { mode: 'edit', confirmLabel: '오늘의 집중으로 가기' },
  };

  return (
    <section className={styles.studyInfo}>
      <div className={styles.studyInfoHeader}>
        <div className={styles.studyInfoTopRow}>
          <StudyReactions studyId={studyId} />

          <div className={styles.actionLinks}>
            <button type="button" className={styles.shareLink}>
              공유하기
            </button>
            <div className={styles.seperator}>|</div>
            <button
              type="button"
              className={styles.editLink}
              onClick={() => handleProtectedAction({ type: 'edit' })}
            >
              수정하기
            </button>
            <div className={styles.seperator}>|</div>
            <button
              type="button"
              className={styles.deleteLink}
              onClick={() => handleProtectedAction({ type: 'delete' })}
            >
              스터디 삭제하기
            </button>
          </div>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.studyTitleRow}>
          <h2 className={styles.studyTitle}>
            {study?.name ?? '데이터를 불러오지 못했습니다'}
          </h2>
          <div className={styles.pageShiftGroup}>
            <NavButton
              size="type01"
              to={`/studies/${studyId}/habits`}
              onClick={(e) => {
                e.preventDefault();
                handleProtectedAction({ type: 'habit' });
              }}
            >
              오늘의 습관
            </NavButton>
            <NavButton
              size="type01"
              to={`/studies/${studyId}/focus`}
              onClick={(e) => {
                e.preventDefault();
                handleProtectedAction({ type: 'focus' });
              }}
            >
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

      {pendingAction && (
        <PasswordModal
          studyId={studyId}
          studyName={study?.name}
          mode={MODAL_CONFIG[pendingAction.type].mode}
          confirmLabel={MODAL_CONFIG[pendingAction.type].confirmLabel}
          onClose={() => setPendingAction(null)}
          onSuccess={(password) => {
            setCachedPassword(password);
            localStorage.setItem(VERIFIED_STUDY_KEY, studyId);
            setPendingAction(null);
            runAction(pendingAction);
          }}
        />
      )}
    </section>
  );
}

export default PageHeader;
