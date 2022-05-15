import Head from "next/head";
import styles from "./LoadingLayout.module.css";

export function LoadingLayout({
  url = "",
  title = "",
  imageUrl = "",
  description = "",
}) {
  return (
    <div className={styles.loader}>
      <Head>
        <title>{title} | TheAuto</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | TheAuto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <img src="/loader.svg" alt="loader" />
    </div>
  );
}
