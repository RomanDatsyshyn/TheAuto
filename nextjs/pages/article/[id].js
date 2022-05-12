import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "../../components/MainLayout";
import { useRouter } from "next/router";
import styles from "./Article.module.css";

export default function Article({ article: serverArticle }) {
  const [article, setArticle] = useState(serverArticle);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `http://localhost:1337/api/articles/${router.query.id}`
      );
      const data = await response.json();
      setArticle(data);
    }

    if (!serverArticle) load();
  }, []);

  if (!article) {
    return (
      <MainLayout>
        <a>Loading ...</a>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={article.data.attributes.title}>
      <Link href={"/"}>
        <a>Back to Home</a>
      </Link>
      <div className={styles.main}>
        <h1>{article.data.attributes.title}</h1>
        <div className={styles.content}>{article.data.attributes.content}</div>
      </div>
    </MainLayout>
  );
}

// Відловлюємо і на фронті і на беці
Article.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return { article: null };
  }

  const response = await fetch(
    `http://localhost:1337/api/articles/${query.id}`
  );
  const article = await response.json();

  return { article };
};

// Відловлюємо тільки на беці
// export async function getServerSideProps({ query, req }) {
//   const response = await fetch(
//     `http://localhost:1337/api/articles/${query.id}`
//   );
//   const article = await response.json();

//   return { props: { article } };
// }
