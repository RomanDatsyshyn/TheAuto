import Head from "next/head";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./MainLayout.module.css";

export function MainLayout({ children, title = "" }) {
  return (
    <div className={styles.center}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
