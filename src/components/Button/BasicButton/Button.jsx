// *사용법*
// 버튼 사용할 곳에서 써야 할 props
// bgcolor : 버튼 배경색, 폰트 색상 변경/ "primary"  "gray"
// size : 버튼 크기 변경/ type01: 648px, type02: 600px, type03: 288px, makestudy: 252px
// 예시 :
{
  /* <Button bgcolor="primary" size="type02">
        오늘의 습관으로 가기
      </Button> */
}

import styles from "./Button.module.css";

export const Button = ({ children, bgcolor = "primary", size = "type02" }) => {
  return (
    <>
      <button className={`${styles.button} ${styles[bgcolor]} ${styles[size]}`}>
        {children}
      </button>
    </>
  );
};
