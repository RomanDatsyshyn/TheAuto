import styles from "./ArticlesSection.module.css";
import { Heading } from "../Heading";
import { ShowMoreButton } from "../ShowMoreButton";
import { ArticleItem } from "../ArticleItem";

export function ArticlesSection({ categoryName = "", articles = [] }) {
  return (
    <>
      <Heading title={categoryName} />
      <div className={styles.cardContainer}>
        {articles.data.map((article, index) => {
          const { title, updatedAt, preview } = article.attributes;
          const { url } = preview.data.attributes;

          return (
            <ArticleItem
              title={title}
              updatedAt={updatedAt}
              categoryName={categoryName}
              url={url}
              key={index}
            />
          );
        })}
        {articles.data.map((article, index) => {
          const { title, updatedAt, preview } = article.attributes;
          const { url } = preview.data.attributes;

          return (
            <ArticleItem
              title={title}
              updatedAt={updatedAt}
              categoryName={categoryName}
              url={url}
              key={index}
            />
          );
        })}
        {articles.data.map((article, index) => {
          const { title, updatedAt, preview } = article.attributes;
          const { url } = preview.data.attributes;

          return (
            <ArticleItem
              title={title}
              updatedAt={updatedAt}
              categoryName={categoryName}
              url={url}
              key={index}
            />
          );
        })}
      </div>
      <ShowMoreButton />
    </>
  );
}