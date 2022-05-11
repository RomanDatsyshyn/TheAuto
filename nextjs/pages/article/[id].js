import { useState, useEffect } from "react";
import Link from "next/link";
import { MainLayout } from "../../components/MainLayout";
import { useRouter } from "next/router";

export default function Article({ article: serverArticle }) {
  const [article, setArticle] = useState(serverArticle);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(
        `http://localhost:1337/api/articles/${router.query.id}`
      );
      const data = await response.json();
      setArticle(data);
    }

    if (!serverArticle) load();
  }, []);

  if (!article) {
    return (
      <MainLayout>
        <a>Loading ...</a>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Link href={"/"}>
        <a>Back to Home</a>
      </Link>
      <h1>{article.data.attributes.title}</h1>
      <div>{article.data.attributes.content}</div>
    </MainLayout>
  );
}

Article.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return { article: null };
  }

  const response = await fetch(
    `http://localhost:1337/api/articles/${query.id}`
  );
  const article = await response.json();

  return { article };
};
