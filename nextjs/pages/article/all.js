import { useState, useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";
import { ArticlesContainer } from "../../components/ArticlesContainer";
import { LoadingLayout } from "../../components/LoadingLayout";
import { NextPageButton } from "../../components/NextPageButton";

export default function All({
  articles: serverArticles,
  menuCategories: serverMenuCategories,
}) {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState(serverArticles);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=2`;
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
    const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc&pagination[page]=1&pagination[pageSize]=${
      page * 3
    }`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const nextPage = () => setPage(page + 1);

  if (!articles && !menuCategories) return <LoadingLayout title={"All"} />;

  return (
    <MainLayout title={"Останні додані"} menuCategories={menuCategories}>
      <ArticlesContainer articles={articles} title={"Останні додані"} />
      {articles &&
        articles.data &&
        articles.data.length > 1 &&
        articles.meta.pagination.total > articles.data.length && (
          <NextPageButton nextPage={nextPage} />
        )}
    </MainLayout>
  );
}

All.getInitialProps = async ({ req }) => {
  if (!req) return { articles: null };

  const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc&pagination[page]=1&pagination[pageSize]=2`;
  const response = await fetch(url);
  const articles = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { articles, menuCategories };
};
