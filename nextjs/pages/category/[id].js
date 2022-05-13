import { useState, useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";
import { ArticlesContainer } from "../../components/ArticlesContainer";
import { useRouter } from "next/router";
import { LoadingLayout } from "../../components/LoadingLayout";

export default function Category({
  articles: serverArticles,
  menuCategories: serverMenuCategories,
}) {
  const [articles, setArticles] = useState(serverArticles);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${id}&sort=id:desc`;
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

  if (!articles && !menuCategories) return <LoadingLayout title={"Category"} />;

  return (
    <MainLayout title={"Category"} menuCategories={menuCategories}>
      <ArticlesContainer articles={articles} />
    </MainLayout>
  );
}

Category.getInitialProps = async ({ query, req }) => {
  if (!req) return { articles: null };

  const url = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${query.id}&sort=id:desc`;
  const response = await fetch(url);
  const articles = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { articles, menuCategories };
};
