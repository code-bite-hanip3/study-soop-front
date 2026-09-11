import styles from './StudyCard.module.css';
import listBack from '../../../../assets/listBack.png';
import { Point } from '../../../../components/Point';
import { ReactionList } from '../../../../components/ReactionList';
import { postStudyReaction } from '../../mocks/mockData';
import { useNavigate } from 'react-router';

const THEME_CLASS = {
  green: styles.themeGreen,
  yellow: styles.themeYellow,
};

const THUMBNAILS = {
  listBack,
};

function StudyCard({ study }) {
  const { id, title, dayLabel, description, thumbnail, themeColor } = study;
  const navigate = useNavigate();

  const hasImage = Boolean(thumbnail);
  const cardClassName = [
    styles.card,
    hasImage ? styles.hasImage : THEME_CLASS[themeColor] || styles.themeDefault,
  ].join(' ');

  const handleReact = (type) => postStudyReaction({ studyId: id, type });

  const handleCardClick = (event) => {
    if (event.target.closest('button, a')) return;
    navigate(`/studies/${id}`);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target.closest('button, a')) return;
      event.preventDefault();
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
          <h3 className={styles.title}>{title}</h3>

          <Point point={study.points} />
        </div>

        <p className={styles.dayLabel}>{dayLabel}</p>
        <p className={styles.description}>{description}</p>

        <ReactionList
          reactions={study.reactions}
          onReact={handleReact}
          variant={hasImage ? 'overlay' : 'default'}
        />
      </div>
    </article>
  );
}

export default StudyCard;
