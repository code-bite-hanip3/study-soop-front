// *사용법*
// 버튼 사용할 곳에서 써야 할 props
// bgcolor : 버튼 배경색, 폰트 색상 변경/ "primary"  "green"
// disabled : props로 추가하면 버튼 비활성화, 클릭이 안됨, 배경색 회색으로 변경
// icon : "restart" 버튼 안에 restart기호, "pause" 버튼 안에 pause기호
// 셀프 닫힘 태그
// 예시 :
{
  /* <CircleButton icon="pause" bgcolor="green"/> */
}

import styles from "./CircleButton.module.css";

export const CircleButton = ({
  bgcolor = "primary",
  icon = "restart",
  disabled = false,
}) => {
  return (
    <>
      <button
        className={`${styles.button} ${styles[icon]} ${styles[bgcolor]} ${disabled ? styles.disabled : ""}`}
      ></button>
    </>
  );
};
