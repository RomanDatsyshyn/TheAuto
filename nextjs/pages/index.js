import { useState, useEffect } from "react";
import { MainLayout } from "../components/MainLayout";
import { ArticlesSection } from "../components/ArticlesSection";
import { LastAddedSection } from "../components/LastAddedSection";
import { LoadingLayout } from "../components/LoadingLayout";

export default function Home({
  categories: serverCategories,
  menuCategories: serverMenuCategories,
  lastAdded: serverLastAdded,
}) {
  const [categories, setCategories] = useState(serverCategories);
  const [menuCategories, setMenuCategories] = useState(serverMenuCategories);
  const [lastAdded, setLastAdded] = useState(serverLastAdded);

  useEffect(() => {
    async function load() {
      const url = `http://localhost:1337/api/categories?fields=name,identificator&populate[articles][sort]=id:desc&populate[articles][populate][0]=preview,categories`;
      const response = await fetch(url);
      const data = await response.json();

      const menuCategoriesUrl = `http://localhost:1337/api/categories?fields=name,identificator`;
      const response2 = await fetch(menuCategoriesUrl);
      const menuCategories = await response2.json();

      const lastAddedUrl = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc`;
      const response3 = await fetch(lastAddedUrl);
      const lastAdded = await response3.json();

      setMenuCategories(menuCategories);
      setLastAdded(lastAdded);
      setCategories(data);
    }

    if (!serverCategories && !serverMenuCategories && !serverLastAdded) load();
  }, []);

  if (!categories && !menuCategories && !lastAdded)
    return <LoadingLayout title={"Home"} />;

  return (
    <MainLayout
      title={"Автомобілі та все про них!"}
      description={
        "Корисні статті про автомобілі, рейтинти авто, порівняння та поради для кожного автомобіліста. Все про електромобілі та авто з ДВЗ читайте на сайті TheAuto."
      }
      menuCategories={menuCategories}
    >
      <LastAddedSection articles={lastAdded.data.slice(0, 3)} />
      {categories &&
        categories.data &&
        categories.data.map((category, index) => {
          const { name, articles, identificator } = category.attributes;
          if (articles.data.length) {
            return (
              <ArticlesSection
                categoryName={name}
                categoryId={identificator}
                articles={articles.data.slice(0, 3)}
                key={index}
              />
            );
          }
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

  const lastAddedUrl = `http://localhost:1337/api/articles?fields=title,url,updatedAt&populate=preview,categories&sort=id:desc`;
  const response3 = await fetch(lastAddedUrl);
  const lastAdded = await response3.json();

  return { categories, menuCategories, lastAdded };
};
