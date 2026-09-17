import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './Edit.module.css';
import { Panel } from '../../components/Panel';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/BasicButton';
import {
  fetchStudyDetail,
  updateStudy,
  verifyStudyPassword,
} from '../../api/studies.js';
import { getPassword, clearPassword } from '../../api/client.js';

import bgSelectedIcon from '../../assets/icon_bg_selected.svg';
import bg01 from '../../assets/bg/bg01.png';
import bg02 from '../../assets/bg/bg02.png';
import bg03 from '../../assets/bg/bg03.png';
import bg04 from '../../assets/bg/bg04.png';

const bgOptions = [
  { type: 'COLOR', value: '#E3EEDD' },
  { type: 'COLOR', value: '#FBEFD3' },
  { type: 'COLOR', value: '#E0F1F5' },
  { type: 'COLOR', value: '#FDE0E9' },
  { type: 'IMAGE', value: bg01 },
  { type: 'IMAGE', value: bg02 },
  { type: 'IMAGE', value: bg03 },
  { type: 'IMAGE', value: bg04 },
];

function EditPage() {
  const { studyId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundType, setBackgroundType] = useState('COLOR');
  const [backgroundValue, setBackgroundValue] = useState('#E3EEDD');

  const [nameError, setNameError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const password = getPassword();

    if (!password) {
      navigate(`/studies/${studyId}`, { replace: true });
      return;
    }
    verifyStudyPassword(studyId, password)
      .then(() => fetchStudyDetail(studyId))
      .then((study) => {
        setName(study.name ?? '');
        setDescription(study.description ?? '');
        setBackgroundType(study.backgroundType ?? 'COLOR');
        setBackgroundValue(study.backgroundValue ?? '#E3EEDD');
      })
      .catch(() => {
        clearPassword();
        navigate(`/studies/${studyId}`, { replace: true });
      })
      .finally(() => setIsLoading(false));
  }, [studyId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setFormError('');

    if (!name.trim()) {
      setNameError('스터디 이름을 입력해 주세요');
      return;
    }
    setNameError('');

    try {
      setIsSubmitting(true);

      await updateStudy(studyId, {
        name: name.trim(),
        description: description.trim(),
        backgroundType,
        backgroundValue,
      });

      navigate(`/studies/${studyId}`);
    } catch (error) {
      if (error.message.includes('비밀번호')) {
        clearPassword();
        navigate(`/studies/${studyId}`, { replace: true });
        return;
      }

      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Panel>
        <p className={styles.statusText}>불러오는 중...</p>
      </Panel>
    );
  }

  return (
    <Panel>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.inputTitle}>스터디 수정하기</h1>

        <div className={styles.inputSpacing}>
          <Input
            label={'스터디 이름'}
            placeholder={'스터디 이름을 입력해 주세요'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
          />
        </div>

        <div className={styles.textareaWrap}>
          <label className={styles.inputLabel}>소개</label>

          <textarea
            className={styles.textarea}
            placeholder="소개 멘트를 작성해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label className={styles.inputLabel}>배경을 선택해주세요</label>
        <div className={styles.bgList}>
          {bgOptions.map((option) => {
            const isSelected =
              backgroundType === option.type &&
              backgroundValue === option.value;

            return (
              <button
                className={styles.bgItems}
                key={option.value}
                type="button"
                style={
                  option.type === 'COLOR'
                    ? { backgroundColor: option.value }
                    : { backgroundImage: `url(${option.value})` }
                }
                onClick={() => {
                  setBackgroundType(option.type);
                  setBackgroundValue(option.value);
                }}
              >
                {isSelected && (
                  <img
                    className={styles.selectIcon}
                    src={bgSelectedIcon}
                    alt="선택 아이콘"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.underButton}>
          {formError && <p className={styles.formError}>*{formError}</p>}
          <Button bgcolor="primary" size="type02" disabled={isSubmitting}>
            {isSubmitting ? '수정 중...' : '수정하기'}
          </Button>
        </div>
      </form>
    </Panel>
  );
}

export default EditPage;
