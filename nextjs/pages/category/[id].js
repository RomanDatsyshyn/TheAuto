import { useState, useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";
import { ArticlesContainer } from "../../components/ArticlesContainer";
import { useRouter } from "next/router";
import { LoadingLayout } from "../../components/LoadingLayout";
import { NextPageButton } from "../../components/NextPageButton";
import Error from "next/error";

export default function Category({
  articles: serverArticles,
  menuCategories: serverMenuCategories,
}) {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState(serverArticles);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${id}&sort=id:desc&pagination[page]=1&pagination[pageSize]=${
        page * 3
      }`;
      const response = await fetch(url);
      const data = await response.json();

      const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
      const response2 = await fetch(menuCategoriesUrl);
      const menuCategories = await response2.json();

      setMenuCategories(menuCategories);
      setArticles(data);
    }

    if (!serverArticles && !serverMenuCategories) load();
  }, []);

  const refetch = async () => {
    const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${id}&sort=id:desc&pagination[page]=1&pagination[pageSize]=${
      page * 3
    }${page * 3}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const nextPage = () => setPage(page + 1);

  if (!articles && !menuCategories) return <LoadingLayout title={"Category"} />;
  if (articles.data.length === 0) return <Error statusCode={404} />;

  const { name, description } =
    articles.data[0].attributes.categories.data[0].attributes;

  return (
    <MainLayout
      title={name}
      description={description}
      menuCategories={menuCategories}
    >
      <ArticlesContainer articles={articles} title={name} />
      {articles &&
        articles.data &&
        articles.data.length > 1 &&
        articles.meta.pagination.total > articles.data.length && (
          <NextPageButton nextPage={nextPage} />
        )}
    </MainLayout>
  );
}

Category.getInitialProps = async ({ query, req }) => {
  if (!req) return { articles: null };

  const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${query.id}&sort=id:desc&pagination[page]=1&pagination[pageSize]=3`;
  const response = await fetch(url);
  const articles = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { articles, menuCategories };
};
