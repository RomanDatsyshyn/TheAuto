import { useState, useEffect } from "react";
import { MainLayout } from "../../components/MainLayout";
import { ArticlesContainer } from "../../components/ArticlesContainer";
import { useRouter } from "next/router";
import { LoadingLayout } from "../../components/LoadingLayout";

export default function Category({ articles: serverArticles }) {
  const [articles, setArticles] = useState(serverArticles);

  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `http://localhost:1337/api/articles?fields=title,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${router.query.id}`
      );
      const data = await response.json();
      setArticles(data);
    }

    if (!serverArticles) load();
  }, []);

  if (!articles) {
    return <LoadingLayout title={"Category"} />;
  }

  return (
    <MainLayout title={"Category"}>
      <ArticlesContainer articles={articles} />
    </MainLayout>
  );
}

Category.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return { articles: null };
  }
  const response = await fetch(
    `http://localhost:1337/api/articles?fields=title,updatedAt&populate=preview,categories&filters[categories][identificator][$eq]=${query.id}`
  );
  const articles = await response.json();

  return { articles };
};
