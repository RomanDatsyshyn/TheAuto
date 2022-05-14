import { useState, useEffect } from "react";
import Link from "next/link";
import Error from "next/error";
import { MainLayout } from "../../components/MainLayout";
import { LoadingLayout } from "../../components/LoadingLayout";
import { useRouter } from "next/router";
import styles from "./Article.module.css";

export default function Article({
  article: serverArticle,
  menuCategories: serverMenuCategories,
}) {
  const [article, setArticle] = useState(serverArticle);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/articles?filters[url][$eq]=${id}`;
      const response = await fetch(url);
      const data = await response.json();

      const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
      const response2 = await fetch(menuCategoriesUrl);
      const menuCategories = await response2.json();

      setMenuCategories(menuCategories);
      setArticle(data);
    }

    if (!serverArticle) load();
  }, []);

  if (!article) return <LoadingLayout title={"Loading"} />;
  if (article.data[0] === undefined) return <Error statusCode={404} />;

  return (
    <MainLayout
      title={article.data[0].attributes.title}
      menuCategories={menuCategories}
    >
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

  const url = `http://localhost:1337/api/articles?filters[url][$eq]=${query.id}`;
  const response = await fetch(url);
  const article = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { article, menuCategories };
};
