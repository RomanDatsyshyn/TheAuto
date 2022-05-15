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
}) {
  return (
    <div className={styles.center}>
      <Head>
        <title>{title} | TheAuto</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | TheAuto`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <Header menuCategories={menuCategories} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
