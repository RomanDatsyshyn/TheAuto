import { useState, useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";
import { ArticlesContainer } from "../../components/ArticlesContainer";
import { LoadingLayout } from "../../components/LoadingLayout";

export default function All({
  articles: serverArticles,
  menuCategories: serverMenuCategories,
}) {
  const [articles, setArticles] = useState(serverArticles);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc`;
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

  if (!articles && !menuCategories) return <LoadingLayout title={"All"} />;

  return (
    <MainLayout title={"Останні додані"} menuCategories={menuCategories}>
      <ArticlesContainer articles={articles} />
    </MainLayout>
  );
}

All.getInitialProps = async ({ query, req }) => {
  if (!req) return { articles: null };

  const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc`;
  const response = await fetch(url);
  const articles = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { articles, menuCategories };
};
