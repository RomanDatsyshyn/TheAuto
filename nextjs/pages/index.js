import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { ArticlesSection } from "../components/ArticlesSection";
import { LoadingLayout } from "../components/LoadingLayout";

export default function Home({ categories: serverCategories }) {
  const [categories, setCategories] = useState(serverCategories);

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `http://localhost:1337/api/categories?populate[articles][populate][0]=preview&fields=name`
      );
      const data = await response.json();
      setCategories(data);
    }

    if (!serverCategories) load();
  }, []);

  if (!categories) {
    return <LoadingLayout title={"Home"} />;
  }

  return (
    <MainLayout title={"Home"}>
      {categories.data.map((category, index) => {
        const { name, articles } = category.attributes;
        return (
          <ArticlesSection
            categoryName={name}
            articles={articles}
            categoryId={category.id}
            key={index}
          />
        );
      })}
    </MainLayout>
  );
}

Home.getInitialProps = async ({ req }) => {
  if (!req) {
    return { categories: null };
  }

  const response = await fetch(
    `http://localhost:1337/api/categories?populate[articles][populate][0]=preview&fields=name`
  );
  const categories = await response.json();

  return { categories };
};
