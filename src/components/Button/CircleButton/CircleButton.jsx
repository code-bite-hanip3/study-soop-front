// *사용법*
// 버튼 사용할 곳에서 써야 할 props
// bgcolor : 버튼 배경색, 폰트 색상 변경/ "primary"  "green"
// disabled : props로 추가하면 버튼 비활성화, 클릭이 안됨, 배경색 회색으로 변경
// icon : "restart" 버튼 안에 restart기호, "pause" 버튼 안에 pause기호
// onClick : 버튼에 onClick으로 클릭시 함수 작동하기 위한 props 추가
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
  onClick
}) => {
  return (
    <>
      <button
        className={`${styles.button} ${styles[icon]} ${styles[bgcolor]} ${disabled ? styles.disabled : ""}`}
        onClick={onClick}
      ></button>
    </>
  );
};
