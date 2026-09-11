// 포인트 표시 pill — 표시 전용 (포인트 획득은 집중 세션 완료 때 서버가 지급합니다)
import styles from "./Point.module.css";
import pointIcon from "../../assets/icon_point.svg";

export function Point({ point }) {
  return (
    <div className={styles.container}>
      <img src={pointIcon} alt="포인트 아이콘" />
      {point ?? 0}P 획득
    </div>
  );
}