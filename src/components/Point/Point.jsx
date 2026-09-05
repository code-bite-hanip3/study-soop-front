import { useState } from "react";
import styles from "./Point.module.css";
import pointIcon from "../../assets/icon_point.svg";

export function Point() {
  const [point, setPoint] = useState(0);
  const handleClick = () => {
    setPoint((prev) => prev + 1);
  };

  return (
    <div onClick={handleClick} className={styles.container}>
      <img src={pointIcon} alt="포인트 아이콘" />
      {point}P 획득
    </div>
  );
}
