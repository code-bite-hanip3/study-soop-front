import styles from './StudyCard.module.css';
import listBack from '../../../../assets/images/listBack.png';
import sf from '../../../../assets/images/sf.png';
import banff from '../../../../assets/images/banff.png';
import calgary from '../../../../assets/images/calgary.png';
import canmore from '../../../../assets/images/canmore.png';
import hanGang from '../../../../assets/images/hanGang.png';
import { Point } from '../../../../components/Point';
import { ReactionList } from '../../../../components/ReactionList';
import { useNavigate } from 'react-router';

// 파스텔 배경 hex → 테마 키 (seed/생성 페이지가 내려주는 backgroundValue 기준)
const THEME_KEY_BY_HEX = {
  '#E3EEDD': 'green',
  '#FBEFD3': 'yellow',
  '#E0F1F5': 'blue',
};

const THEME_CLASS = {
  green: styles.themeGreen,
  yellow: styles.themeYellow,
  blue: styles.themeBlue,
};

const DARK_IMAGES = ['banff', 'calgary', 'canmore', 'sf'];

const THUMBNAILS = {
  listBack,
  sf,
  banff,
  calgary,
  canmore,
  hanGang,
};

const DAY_MS = 24 * 60 * 60 * 1000;

// 실 API 응답의 backgroundValue에서 썸네일 키 추출 ('/images/banff.png' → 'banff')
function extractThumbnailKey(backgroundValue) {
  if (!backgroundValue) return '';
  const fileName = backgroundValue.split('/').pop() ?? '';
  return fileName.replace(/\.\w+$/, '');
}

// createdAt → 'N일째 진행 중'
function formatDayLabel(createdAt) {
  if (!createdAt) return '';
  const days = Math.ceil((Date.now() - new Date(createdAt).getTime()) / DAY_MS);
  return `${Math.max(1, days)}일째 진행 중`;
}

// 실 API 응답 reactions [{ emoji, count }] → ReactionList 형식 [{ type, icon, count, hasReacted }]
// hasReacted는 항상 false (로그인 개념 없음 — 클릭 시 로컬 낙관 반영만 유지)
function mapReactions(reactions) {
  return (reactions ?? []).map((reaction) => ({
    type: reaction.emoji,
    icon: reaction.emoji,
    count: reaction.count,
    hasReacted: false,
  }));
}

function StudyCard({ study, onReact, onVisit }) {
  const { id, name, description, backgroundType, backgroundValue, pointTotal, createdAt, reactions } =
    study;
  const navigate = useNavigate();

  const hasImage = backgroundType === 'IMAGE';
  const thumbnail = hasImage ? extractThumbnailKey(backgroundValue) : '';
  const themeKey = THEME_KEY_BY_HEX[backgroundValue?.toUpperCase()] ?? '';
  const reactionItems = mapReactions(reactions);

  const cardClassName = [
    styles.card,
    hasImage ? styles.hasImage : THEME_CLASS[themeKey] || styles.themeDefault,
    hasImage && DARK_IMAGES.includes(thumbnail) ? styles.hasImageDark : '',
  ].join(' ');

  const handleCardClick = (event) => {
    if (event.target.closest('button, a')) return;
    onVisit?.(id);
    navigate(`/studies/${id}`);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target.closest('button, a')) return;
      event.preventDefault();
      onVisit?.(id);
      navigate(`/studies/${id}`);
    }
  };

  return (
    <article
      className={cardClassName}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
    >
      {hasImage && (
        <img
          className={styles.thumbnailImg}
          src={THUMBNAILS[thumbnail]}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className={styles.overlay}>
        <div className={styles.topRow}>
          <h3 className={styles.title}>{name}</h3>

          <Point point={pointTotal} />
        </div>

        <p className={styles.dayLabel}>{formatDayLabel(createdAt)}</p>
        <p className={styles.description}>{description}</p>

        <ReactionList
          reactions={reactionItems}
          onReact={onReact}
          variant={hasImage ? 'overlay' : 'default'}
        />
      </div>
    </article>
  );
}

export default StudyCard;