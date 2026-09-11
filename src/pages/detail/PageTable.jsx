import { cx } from 'classix';
import styles from './PageTable.module.css';
import sticker01 from '../../assets/sticker/sticker_blue_100_07.svg';
import stickerEmpty from '../../assets/sticker/sticker_empty.svg';

function PageTable() {
  return (
    <section className={styles.habitTable}>
      <h2 className={styles.habitTitle}>습관 기록표</h2>

      {/* 헤더 행 */}
      <div className={styles.row}>
        <div className={styles.habitName}></div>
        <div className={cx(styles.cell, styles.day)}>월</div>
        <div className={cx(styles.cell, styles.day)}>화</div>
        <div className={cx(styles.cell, styles.day)}>수</div>
        <div className={cx(styles.cell, styles.day)}>목</div>
        <div className={cx(styles.cell, styles.day)}>금</div>
        <div className={cx(styles.cell, styles.day)}>토</div>
        <div className={cx(styles.cell, styles.day)}>일</div>
      </div>

      {/* 습관 1: 미라클모닝 6시 기상 */}
      <div className={styles.row}>
        <div className={styles.habitName}>미라클모닝 6시 기상</div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
      </div>

      {/* 습관 2: 아침 챙겨 먹기 */}
      <div className={styles.row}>
        <div className={styles.habitName}>아침 챙겨 먹기</div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
      </div>

      {/* 습관 3: React 스터디 책 1챕터 읽기 */}
      <div className={styles.row}>
        <div className={styles.habitName}>React 스터디 책 1챕터 읽기</div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
      </div>

      {/* 습관 4: 스트레칭 (한 번도 안 함) */}
      <div className={styles.row}>
        <div className={styles.habitName}>스트레칭</div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={sticker01} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
        <div className={styles.cell}>
          <img className={styles.sticker} src={stickerEmpty} alt="스티커" />
        </div>
      </div>
    </section>
  );
}

export default PageTable;
