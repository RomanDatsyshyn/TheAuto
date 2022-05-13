import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { ArticlesSection } from "../components/ArticlesSection";
import { LoadingLayout } from "../components/LoadingLayout";

export default function Home({
  categories: serverCategories,
  menuCategories: serverMenuCategories,
}) {
  const [categories, setCategories] = useState(serverCategories);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/categories?fields=name,identificator&populate[articles][sort]=id:desc&populate[articles][populate][0]=preview,categories`;
      const response = await fetch(url);
      const data = await response.json();

      const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
      const response2 = await fetch(menuCategoriesUrl);
      const menuCategories = await response2.json();

      setMenuCategories(menuCategories);
      setCategories(data);
    }

    if (!serverCategories && !serverMenuCategories) load();
  }, []);

  if (!categories && !menuCategories) return <LoadingLayout title={"Home"} />;

  return (
    <MainLayout title={"Home"} menuCategories={menuCategories}>
      {categories.data.map((category, index) => {
        const { name, articles, identificator } = category.attributes;
        return (
          <ArticlesSection
            categoryName={name}
            categoryId={identificator}
            articles={articles.data.slice(0, 3)}
            key={index}
          />
        );
      })}
    </MainLayout>
  );
}

Home.getInitialProps = async ({ req }) => {
  if (!req) return { categories: null };

  const url = `http://localhost:1337/api/categories?fields=name,identificator&populate[articles][sort]=id:desc&populate[articles][populate][0]=preview,categories`;
  const response = await fetch(url);
  const categories = await response.json();

  const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
  const response2 = await fetch(menuCategoriesUrl);
  const menuCategories = await response2.json();

  return { categories, menuCategories };
};
