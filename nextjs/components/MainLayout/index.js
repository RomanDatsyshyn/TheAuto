import Head from "next/head";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./MainLayout.module.css";

export function MainLayout({
  children,
  url = "",
  title = "",
  imageUrl = "",
  description = "",
  menuCategories = [],
  published_time = "",
  modified_time = "",
}) {
  return (
    <div className={styles.center}>
      <Head>
        <title>{title} | TheAuto</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${title} | TheAuto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        {published_time.length && (
          <meta property="article:published_time" content={published_time} />
        )}
        {modified_time.length && (
          <meta property="article:modified_time" content={modified_time} />
        )}
      </Head>
      <Header menuCategories={menuCategories} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
