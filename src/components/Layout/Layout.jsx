import { Header } from "../Header";
import { Outlet } from 'react-router';
import styles from "./Layout.module.css";

export function Layout({ hasCreateButton }) {
  return (
    <>
      <Header hasCreateButton={hasCreateButton} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
