import styles from "./ArticlesContainer.module.css";
import { Heading } from "../Heading";
import { ArticleItem } from "../ArticleItem";
import { ShowMoreButton } from "../ShowMoreButton";

export function ArticlesContainer({ articles = [], title = "" }) {
  return (
    <>
      <Heading titile={title} />
      <div className={styles.cardContainer}>
        {articles.data.map((article, index) => {
          const { title, updatedAt, preview } = article.attributes;
          const { url } = preview.data.attributes;

          return (
            <ArticleItem
              title={title}
              updatedAt={updatedAt}
              categoryName={"categoryName"}
              url={url}
              key={index}
            />
          );
        })}
      </div>
      {articles.length > 9 && <ShowMoreButton />}
    </>
  );
}
