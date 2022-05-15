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

  const oneMoreView = async (data) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer 5c1cd2504220d835134bcbf4b2082a811b86057df1bebf85f53eedd608c463b06cadeb146b1566d865fbbeb4945ca2690855259164e0e865b8e4e61caa82a642ba8180a6e14531e314891520b7735ae0f7ed39ce7ef8d299282246ce27416c310132fa17b1b3767b00e3ec402a7be2234b429502005ea21da867f4e400681149 ",
      },
      body: JSON.stringify({
        data: {
          views:
            data.data[0].attributes.views === null
              ? 1
              : parseInt(data.data[0].attributes.views) + 1,
        },
      }),
    };

    const response = await fetch(
      `http://localhost:1337/api/articles/${data.data[0].id}`,
      requestOptions
    );
    const menuCategories = await response.json();
  };

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
      oneMoreView(data);
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
