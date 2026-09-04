import { Header } from "../Header";
import styles from "./Layout.module.css";

export function Layout({ hasCreateButton, children }) {
  return (
    <>
      <Header hasCreateButton={hasCreateButton} />
      <main className={styles.main}>{children}</main>
    </>
  );
}
