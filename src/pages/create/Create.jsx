import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Create.module.css';
import { Panel } from '../../components/Panel';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/BasicButton';
import { createStudy } from '../../api/studies.js';
import { setPassword } from '../../api/client.js';

import bgSelectedIcon from '../../assets/icon_bg_selected.svg';
import bg01 from '../../assets/bg/bg01.png';
import bg02 from '../../assets/bg/bg02.png';
import bg03 from '../../assets/bg/bg03.png';
import bg04 from '../../assets/bg/bg04.png';

const bgOptions = [
  { type: 'COLOR', value: 'var(--color-green-light)' },
  { type: 'COLOR', value: 'var(--color-yellow-light)' },
  { type: 'COLOR', value: 'var(--color-blue-light)' },
  { type: 'COLOR', value: 'var(--color-pink-light)' },
  { type: 'IMAGE', value: bg01 },
  { type: 'IMAGE', value: bg02 },
  { type: 'IMAGE', value: bg03 },
  { type: 'IMAGE', value: bg04 },
];

function CreatePage() {
  const navigate = useNavigate();

  const [creatorNickname, setCreatorNickname] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundType, setBackgroundType] = useState('COLOR');
  const [backgroundValue, setBackgroundValue] = useState(
    'var(--color-green-light)',
  );
  const [studyPassword, setStudyPassword] = useState('');
  const [studyPasswordConfirm, setStudyPasswordConfirm] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!creatorNickname) {
      setNicknameError('닉네임을 입력해 주세요');
      return;
    }
    setNicknameError('');

    if (!name) {
      setNameError('스터디 이름을 입력해 주세요');
      return;
    }
    setNameError('');

    if (studyPassword.length <= 3) {
      setPasswordError('비밀번호는 4자 이상 입력해 주세요');
      return;
    }
    setPasswordError('');

    if (studyPassword !== studyPasswordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다');
      return;
    }
    setPasswordConfirmError('');

    try {
      setIsSubmitting(true);

      const result = await createStudy({
        creatorNickname,
        name,
        description,
        backgroundType,
        backgroundValue,
        password: studyPassword,
      });

      setPassword(studyPassword);

      navigate(`/studies/${result.id}`);
    } catch (error) {
      setNameError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Panel>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.inputTitle}>스터디 만들기</h1>
        <div className={styles.inputSpacing}>
          <Input
            label={'닉네임'}
            placeholder={'닉네임을 입력해 주세요'}
            value={creatorNickname}
            onChange={(e) => setCreatorNickname(e.target.value)}
            error={nicknameError}
          />
        </div>

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

        <div className={styles.inputSpacing}>
          <Input
            label={'비밀번호'}
            type="password"
            autoComplete="new-password"
            placeholder={'비밀번호를 입력해 주세요'}
            value={studyPassword}
            onChange={(e) => setStudyPassword(e.target.value)}
            error={passwordError}
          />
        </div>

        <div className={styles.inputSpacing}>
          <Input
            label={'비밀번호 확인'}
            type="password"
            autoComplete="new-password"
            placeholder={'비밀번호를 입력해 주세요'}
            value={studyPasswordConfirm}
            onChange={(e) => setStudyPasswordConfirm(e.target.value)}
            error={passwordConfirmError}
          />
        </div>

        <div className={styles.underButton}>
          <Button bgcolor="primary" size="type02" disabled={isSubmitting}>
            {isSubmitting ? '생성 중...' : '만들기'}
          </Button>
        </div>
      </form>
    </Panel>
  );
}

export default CreatePage;
