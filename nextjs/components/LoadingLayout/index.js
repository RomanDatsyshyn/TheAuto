import Head from "next/head";
import styles from "./LoadingLayout.module.css";

export function LoadingLayout({ title }) {
  return (
    <div className={styles.loader}>
      <Head>
        <title>{title}</title>
      </Head>
      <img src="/loader.svg" alt="loader" />
    </div>
  );
}
