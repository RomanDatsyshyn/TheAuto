import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "../../components/MainLayout";
import { LoadingLayout } from "../../components/LoadingLayout";
import { useRouter } from "next/router";
import styles from "./Article.module.css";

export default function Article({ article: serverArticle }) {
  const [article, setArticle] = useState(serverArticle);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `http://localhost:1337/api/articles?filters[url][$eq]=${router.query.id}`
      );
      const data = await response.json();
      setArticle(data);
    }

    if (!serverArticle) load();
  }, []);

  if (!article) {
    return <LoadingLayout title={article.data[0].attributes.title} />;
  }

  return (
    <MainLayout title={article.data[0].attributes.title}>
      <Link href={"/"}>
        <a>Back to Home</a>
      </Link>
      <div className={styles.main}>
        <h1>{article.data[0].attributes.title}</h1>
        <div className={styles.content}>
          {article.data[0].attributes.content}
        </div>
      </div>
    </MainLayout>
  );
}

Article.getInitialProps = async ({ query, req }) => {
  if (!req) return { article: null };

  const response = await fetch(
    `http://localhost:1337/api/articles?filters[url][$eq]=${query.id}`
  );
  const article = await response.json();

  return { article };
};
