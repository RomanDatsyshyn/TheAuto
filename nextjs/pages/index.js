import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { ArticlesSection } from "../components/ArticlesSection";

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
    return (
      <MainLayout>
        <a>Loading ...</a>
      </MainLayout>
    );
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

      {/*
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
        </div> */}
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
