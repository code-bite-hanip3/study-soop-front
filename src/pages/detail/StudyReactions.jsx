import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { cx } from 'classix';
import { useReactions } from '@/hooks/useReactions';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import styles from './StudyReactions.module.css';
import iconSmile from '../../assets/icon_smile.svg';

const VISIBLE_COUNT = 3;
const CLOSE_ANIMATION_MS = 200;

export function StudyReactions({ studyId }) {
  const { reactions, loading, error, react } = useReactions(studyId);

  const [revealStage, setRevealStage] = useState('idle');
  const [listButtonVisible, setListButtonVisible] = useState(false);

  const [isListOpen, setIsListOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [isListClosing, setIsListClosing] = useState(false);
  const [isPickerClosing, setIsPickerClosing] = useState(false);

  const [poppingEmoji, setPoppingEmoji] = useState(null);
  const [reactedEmojis, setReactedEmojis] = useState(new Set());

  const listButtonRef = useRef(null);
  const listAreaRef = useRef(null);
  const pickerAreaRef = useRef(null);

  const [targetWidth, setTargetWidth] = useState(0);
  useLayoutEffect(() => {
    if (listButtonRef.current) {
      setTargetWidth(listButtonRef.current.getBoundingClientRect().width);
    }
  }, [reactions.length]);

  const openList = () => {
    setIsListClosing(false);
    setIsListOpen(true);
  };

  const closeList = () => {
    setIsListClosing(true);
    setTimeout(() => {
      setIsListOpen(false);
      setIsListClosing(false);
    }, CLOSE_ANIMATION_MS);
  };

  const openPicker = () => {
    setIsPickerClosing(false);
    setIsPickerOpen(true);
  };

  const closePicker = () => {
    setIsPickerClosing(true);
    setTimeout(() => {
      setIsPickerOpen(false);
      setIsPickerClosing(false);
    }, CLOSE_ANIMATION_MS);
  };

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        isListOpen &&
        listAreaRef.current &&
        !listAreaRef.current.contains(e.target) &&
        !pickerAreaRef.current?.contains(e.target)
      ) {
        closeList();
      }
      if (
        isPickerOpen &&
        pickerAreaRef.current &&
        !pickerAreaRef.current.contains(e.target) &&
        !listAreaRef.current?.contains(e.target)
      ) {
        closePicker();
      }
    }
    if (isListOpen || isPickerOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isListOpen, isPickerOpen]);

  const handleAddClick = () => {
    if (revealStage === 'idle') {
      setRevealStage('revealing');
      return;
    }

    if (isPickerOpen) {
      closePicker();
    } else {
      openPicker();
    }
  };

  const handleWidthTransitionEnd = (e) => {
    if (e.propertyName !== 'width') return;
    setRevealStage('revealed');
    setListButtonVisible(true);
    openPicker();
  };

  const handleFadeTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') return;
    openList();
  };

  const handleReact = async (emoji) => {
    if (reactedEmojis.has(emoji)) return;

    try {
      await react(emoji);
      setReactedEmojis((prev) => new Set(prev).add(emoji));
      setPoppingEmoji(emoji);
      setTimeout(() => setPoppingEmoji(null), 300);
    } catch {
      // 3번 항목(토스트)은 나중에 처리 할 예정이에요!
    }
  };

  const handleEmojiSelect = (emoji) => {
    openList();
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
            isDisabled={reactedEmojis.has(r.emoji)}
            onClick={() => handleReact(r.emoji)}
          />
        ))}

        {hiddenCount > 0 && (
          <div
            className={styles.listButtonWrap}
            style={{
              width: revealStage === 'idle' ? 0 : targetWidth,
              overflow: revealStage === 'revealed' ? 'visible' : 'hidden',
            }}
            onTransitionEnd={handleWidthTransitionEnd}
          >
            <div ref={listAreaRef} className={styles.listArea}>
              <button
                ref={listButtonRef}
                type="button"
                className={cx(
                  styles.listButton,
                  listButtonVisible && styles.fadeIn,
                )}
                onTransitionEnd={handleFadeTransitionEnd}
                onClick={() => (isListOpen ? closeList() : openList())}
              >
                +{hiddenCount}
              </button>

              {isListOpen && (
                <ul
                  className={cx(
                    styles.fullListPop,
                    isListClosing && styles.popOut,
                  )}
                >
                  {reactions.map((r) => (
                    <li key={r.emoji}>
                      <ReactionBadge
                        reaction={r}
                        isPopping={poppingEmoji === r.emoji}
                        isDisabled={reactedEmojis.has(r.emoji)}
                        onClick={() => handleReact(r.emoji)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div ref={pickerAreaRef} className={styles.pickerArea}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddClick}
          >
            <img src={iconSmile} alt="스마일 아이콘" />
            추가
          </button>

          {isPickerOpen && (
            <div
              className={cx(styles.pickerPop, isPickerClosing && styles.popOut)}
            >
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

function ReactionBadge({ reaction, isPopping, isDisabled, onClick }) {
  return (
    <button
      type="button"
      className={cx(styles.badge, isPopping && styles.popIn)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span aria-hidden="true">{reaction.emoji}</span>
      {reaction.count}
    </button>
  );
}
