import Link from "next/link";
import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { useRouter } from "next/router";

export default function Home({ articles: serverArticles }) {
  const [articles, setArticles] = useState(serverArticles);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:1337/api/articles/`);
      const data = await response.json();
      setArticles(data);
    }

    if (!serverArticles) load();
  }, []);

  if (!articles) {
    return (
      <MainLayout>
        <a>Loading ...</a>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout title={"Home"}>
        <h1>Home</h1>
        <p>
          <Link href={"/about"}>
            <a>About</a>
          </Link>
        </p>
        <p>
          <Link href={"/article/777"}>
            <a>Article</a>
          </Link>
        </p>
        <div>
          {articles.data.map((i, key) => {
            return (
              <Link href={"/article/[id]"} as={`/article/${i.id}`}>
                <a>
                  <h3 key={key}>{i.attributes.title}</h3>
                </a>
              </Link>
            );
          })}
        </div>
      </MainLayout>
    </>
  );
}

Home.getInitialProps = async ({ req }) => {
  if (!req) {
    return { articles: null };
  }

  const response = await fetch("http://localhost:1337/api/articles");
  const articles = await response.json();

  return { articles };
};
