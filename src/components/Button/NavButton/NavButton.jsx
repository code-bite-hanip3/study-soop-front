// *사용법*
// 버튼 사용할 곳에서 써야 할 props
// size : 버튼 크기 변경/ type01: 144px, type02: 82px
// onClick : 버튼에 onClick으로 클릭시 함수 작동하기 위한 props 추가
// 예시 :
{
  /* <NavButton size="type01"> 오늘의 습관</NavButton>
      <NavButton size="type02"> 홈</NavButton>*/
}

import styles from "./NavButton.module.css";

export const NavButton = ({ children, size = "type01", onClick }) => {
  return (
    <>
      <button className={`${styles.button} ${styles[size]}`}
      onClick={onClick}>{children}</button>
    </>
  );
};
