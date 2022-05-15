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
      const url = `http://localhost:1337/api/articles?filters[url][$eq]=${id}&populate[categories][populate]&populate[preview][populate]`;
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

  const { title, content, description, publishedAt, updatedAt, preview } =
    article.data[0].attributes;
  const { name, identificator } =
    article.data[0].attributes.categories.data[0].attributes;
  const { url: imageUrl } = preview.data.attributes;

  const getDateFormat = (d) => {
    const date = new Date(d);
    const itemYear = date.getFullYear();
    const itemMonth = date.getMonth() + 1;
    const itemDay = date.getDate();

    const formatedDate = `${itemDay < 10 ? "0" + itemDay : itemDay}.${
      itemMonth < 10 ? "0" + itemMonth : itemMonth
    }.${itemYear}`;

    return formatedDate;
  };

  return (
    <MainLayout
      title={title}
      description={description}
      menuCategories={menuCategories}
      published_time={publishedAt}
      modified_time={updatedAt}
      url={`http://localhost:3001/article/${id}`}
      imageUrl={`http://localhost:1337${imageUrl}`}
    >
      <nav aria-label="Breadcrumb">
        <ol className="breadcrumb">
          <li>
            <Link href={"/"}>
              <a>Головна</a>
            </Link>
          </li>
          <li>
            <Link href={"/category/[id]"} as={`/category/${identificator}`}>
              <a>{name}</a>
            </Link>
          </li>
          <li>
            <span aria-current="location">{title}</span>
          </li>
        </ol>
      </nav>
      <div className={styles.center}>
        <div className={styles.main}>
          <h1>{title}</h1>
          <div className={styles.date}>
            Дата публікації:{" "}
            <time itemProp="datePublished" dateTime={publishedAt}>
              {getDateFormat(publishedAt)}
            </time>
            {publishedAt !== updatedAt && " / Останні зміни: "}
            {publishedAt !== updatedAt && (
              <time itemProp="dateModified" dateTime={updatedAt}>
                {getDateFormat(updatedAt)}
              </time>
            )}
          </div>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    </MainLayout>
  );
}

Article.getInitialProps = async ({ query, req }) => {
  if (!req) return { article: null };

  const url = `http://localhost:1337/api/articles?filters[url][$eq]=${query.id}&populate[categories][populate]&populate[preview][populate]`;
  const response = await fetch(url);
  const article = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { article, menuCategories };
};
