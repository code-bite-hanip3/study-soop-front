// *사용법*
// 버튼 사용할 곳에서 써야 할 props
// bgcolor : 버튼 배경색, 폰트 색상 변경/ "primary"  "gray"
// disabled : props로 추가하면 버튼 비활성화, 클릭이 안됨
// 토글 기능 : 버튼 클릭시 start, stop 변환
// 셀프 닫힘 태그
// 예시 :
{
  /* <RecordButton bgcolor="primary" disabled /> */
}

import { useState } from "react";
import styles from "./RecordButton.module.css";

export const RecordButton = ({
  children,
  bgcolor = "primary",
  disabled = false,
}) => {
  const [record, setRecord] = useState("start");

  const handleRecord = () => {
    setRecord((prev) => (prev === "start" ? "stop" : "start"));
  };

  return (
    <>
      <button
        className={`${styles.button} 
        ${styles[bgcolor]} 
        ${styles[record === "start" ? "start" : "stop"]}
        ${disabled ? styles.disabled : ""}`}
        onClick={handleRecord}
        disabled={disabled}
      >
        {children ?? (record === "start" ? "Start!" : "Stop!")}
      </button>
    </>
  );
};
