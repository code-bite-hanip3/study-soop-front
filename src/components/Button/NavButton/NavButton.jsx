// *사용법*
// 버튼 사용할 곳에서 써야 할 props
// size : 버튼 크기 변경/ type01: 144px, type02: 82px
// onClick : 버튼에 onClick으로 클릭시 함수 작동하기 위한 props 추가
// to : 버튼 클릭 시 이동할 경로를 지정하기 위한 props (react-router의 Link 컴포넌트에 전달됨)
// 예시 :
{
  /*
    <NavButton size="type01"> 오늘의 습관</NavButton>
    <NavButton size="type02"> 홈</NavButton>
    <NavButton size="type01" to="/habits"> 오늘의 습관</NavButton>
  */
}

import { Link } from 'react-router';
import styles from './NavButton.module.css';

export const NavButton = ({ children, size = 'type01', onClick, to }) => {
  return (
    <>
      <Link
        className={`${styles.button} ${styles[size]}`}
        onClick={onClick}
        to={to}
      >
        {children}
      </Link>
    </>
  );
};
