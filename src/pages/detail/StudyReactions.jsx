import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useReactions } from '@/hooks/useReactions';
import styles from './StudyReactions.module.css';

const VISIBLE_COUNT = 3;

export function StudyReactions({ studyId }) {
  const { reactions, loading, error, react } = useReactions(studyId);

  const [revealStage, setRevealStage] = useState('idle');
  const [listButtonVisible, setListButtonVisible] = useState(false); // opacity 페이드인 여부
  const [isListOpen, setIsListOpen] = useState(false); // 전체 목록 팝업
  const [isPickerOpen, setIsPickerOpen] = useState(false); // 이모지 피커
  const [poppingEmoji, setPoppingEmoji] = useState(null);

  const listButtonRef = useRef(null); // 실제 너비 측정용
  const listButtonWrapRef = useRef(null); // width transition 걸 wrapper
  const listAreaRef = useRef(null);
  const pickerAreaRef = useRef(null);

  // 전체 목록보기 버튼의 실제 너비를 미리 측정해서 wrapper에 세팅
  const [targetWidth, setTargetWidth] = useState(0);
  useLayoutEffect(() => {
    if (listButtonRef.current) {
      setTargetWidth(listButtonRef.current.getBoundingClientRect().width);
    }
  }, [reactions.length]); // 이모지 개수 바뀌면(+N 숫자 자릿수 변화 등) 다시 측정

  // 바깥 클릭 시 각각 독립적으로 닫기
  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        isListOpen &&
        listAreaRef.current &&
        // !listAreaRef.current.contains(e.target)
        !listAreaRef.current.contains(e.target) &&
        !pickerAreaRef.current?.contains(e.target)
      ) {
        setIsListOpen(false);
      }
      if (
        isPickerOpen &&
        pickerAreaRef.current &&
        // !pickerAreaRef.current.contains(e.target)
        !pickerAreaRef.current.contains(e.target) &&
        !listAreaRef.current?.contains(e.target)
      ) {
        setIsPickerOpen(false);
      }
    }
    if (isListOpen || isPickerOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isListOpen, isPickerOpen]);

  const handleAddClick = () => {
    if (revealStage === 'idle') {
      setRevealStage('revealing'); // width 0 → target 애니메이션 시작
      return;
    }
    // 이미 다 펼쳐진 상태라면, 추가 버튼은 그냥 피커 토글 역할만
    setIsPickerOpen((prev) => !prev);
  };

  // width transition이 끝나는 시점 — 여기서 두 가지가 동시에 트리거됨
  const handleWidthTransitionEnd = (e) => {
    if (e.propertyName !== 'width') return;
    setRevealStage('revealed');
    setListButtonVisible(true); // 전체목록보기 버튼 페이드인 시작
    setIsPickerOpen(true); // 이모지 피커 pop-in으로 오픈
  };

  // opacity(페이드인) transition이 끝나는 시점 — 전체 목록 팝업 자동 오픈
  const handleFadeTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') return;
    setIsListOpen(true);
  };

  const handleReact = async (emoji) => {
    try {
      await react(emoji);
      setPoppingEmoji(emoji);
      setTimeout(() => setPoppingEmoji(null), 300);
    } catch {
      // 3번 항목(토스트)은 나중에 처리
    }
  };

  const handleEmojiSelect = (emoji) => {
    setIsListOpen(true); // 새 이모지 추가하면 전체 목록 자동 오픈 유지
    handleReact(emoji.native);
  };

  if (loading) return null;

  if (error) {
    return (
      <div className={styles.badgeRow}>
        {['😢', '😢', '😢'].map((face, i) => (
          <span key={i} className={styles.badge}>
            {face}
          </span>
        ))}
      </div>
    );
  }

  const visible = reactions.slice(0, VISIBLE_COUNT);
  const hiddenCount = Math.max(reactions.length - VISIBLE_COUNT, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.badgeRow}>
        {visible.map((r) => (
          <ReactionBadge
            key={r.emoji}
            reaction={r}
            isPopping={poppingEmoji === r.emoji}
            onClick={() => handleReact(r.emoji)}
          />
        ))}

        {/* width 0 → target 으로 transition, 그 결과로 옆의 '추가' 버튼이 밀려남 */}
        {hiddenCount > 0 && (
          <div
            ref={listButtonWrapRef}
            className={styles.listButtonWrap}
            style={{
              width: revealStage === 'idle' ? 0 : targetWidth,
              overflow: revealStage === 'revealed' ? 'visible' : 'hidden',
            }}
            onTransitionEnd={handleWidthTransitionEnd}
          >
            {/* 버튼과 전체 목록 패널을 listAreaRef 하나로 묶음 */}
            <div ref={listAreaRef} className={styles.listArea}>
              <button
                ref={listButtonRef}
                type="button"
                className={`${styles.listButton} ${
                  listButtonVisible ? styles.fadeIn : ''
                }`}
                onTransitionEnd={handleFadeTransitionEnd}
                onClick={() => setIsListOpen((prev) => !prev)}
              >
                +{hiddenCount}
              </button>

              {isListOpen && (
                <ul className={styles.fullListPop}>
                  {reactions.map((r) => (
                    <li key={r.emoji}>
                      <ReactionBadge
                        reaction={r}
                        isPopping={poppingEmoji === r.emoji}
                        onClick={() => handleReact(r.emoji)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* 추가 버튼과 피커를 pickerAreaRef 하나로 묶음 */}
        <div ref={pickerAreaRef} className={styles.pickerArea}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddClick}
          >
            추가
          </button>

          {isPickerOpen && (
            <div className={styles.pickerPop}>
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                locale="ko"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReactionBadge({ reaction, isPopping, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.badge} ${isPopping ? styles.popIn : ''}`}
      onClick={onClick}
    >
      <span aria-hidden="true">{reaction.emoji}</span>
      {reaction.count}
    </button>
  );
}
