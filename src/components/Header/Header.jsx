import logoDesktop from "../../assets/logo_desktop.svg";
import logoMobile from "../../assets/logo_mobile.svg";
import styles from "./Header.module.css";

export function Header({ hasCreateButton = false }) {
  return (
    <header>
      <div className={styles.container}>
        <a className={styles.logo} href="/">
          <img className={styles.logoDesktop} src={logoDesktop} alt="공부의숲 로고 이미지" />
          <img className={styles.logoMobile} src={logoMobile} alt="공부의숲 로고 이미지" />
        </a>
        {hasCreateButton && (
          <a className={styles.button} href="/">
            스터디 만들기
          </a>
        )}
      </div>
    </header>
  );
}
