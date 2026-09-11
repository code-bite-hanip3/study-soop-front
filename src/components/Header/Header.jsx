import { Link } from 'react-router';
import logoDesktop from "../../assets/logo_desktop.svg";
import logoMobile from "../../assets/logo_mobile.svg";
import styles from "./Header.module.css";

export function Header({ hasCreateButton = false }) {
  return (
    <header>
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <img className={styles.logoDesktop} src={logoDesktop} alt="공부의숲 로고 이미지" />
          <img className={styles.logoMobile} src={logoMobile} alt="공부의숲 로고 이미지" />
        </Link>
        {hasCreateButton && (
          <Link className={styles.button} to="/create">
            스터디 만들기
          </Link>
        )}
      </div>
    </header>
  );
}
