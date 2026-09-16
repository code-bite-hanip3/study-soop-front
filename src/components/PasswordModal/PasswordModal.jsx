import { useState } from 'react';
import styles from './PasswordModal.module.css';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Button } from '../Button/BasicButton';
import { Toast } from '../Toast';
import { verifyStudyPassword } from '../../api/studies';

function PasswordModal({
  studyId,
  studyName,
  mode = 'edit',
  onClose,
  onSuccess,
}) {
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!password.trim()) {
      setToastKey((prev) => prev + 1);
      setShowToast(true);
      return;
    }
    
    setIsSubmitting(true);

    try {
      await verifyStudyPassword(studyId, password);

      onSuccess(password);
    } catch {
      setToastKey((prev) => prev + 1);
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.studyName}>{studyName}</h2>

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              나가기
            </button>
          </div>

          <h3 className={styles.message}>권한이 필요해요!</h3>

          <div className={styles.form}>
            <div className={styles.inputWrap}>
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.buttonWrap}>
              <Button
                bgcolor="primary"
                size="type01"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {mode === 'delete' ? '삭제하기' : '수정하러 가기'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {showToast && (
        <Toast
          key={toastKey}
          imoji="🚨"
          text="비밀번호가 일치하지 않습니다. 다시 입력해주세요."
          className={styles.toast}
        />
      )}
    </>
  );
}

export default PasswordModal;
