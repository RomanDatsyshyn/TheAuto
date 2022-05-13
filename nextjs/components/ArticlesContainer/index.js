import styles from "./ArticlesContainer.module.css";
import { Heading } from "../Heading";
import { ArticleItem } from "../ArticleItem";
import { ShowMoreButton } from "../ShowMoreButton";

export function ArticlesContainer({ articles = [], title = "" }) {
  return (
    <div className={styles.center}>
      <Heading title={title} />
      <div className={styles.cardContainer}>
        {articles.data.map((article, index) => {
          const {
            title,
            updatedAt,
            preview,
            categories,
            url: articleUrl,
          } = article.attributes;
          const { url: imageUrl } = preview.data.attributes;

          const { data } = categories;
          const { identificator, name } = data[0].attributes;

          return (
            <ArticleItem
              title={title}
              updatedAt={updatedAt}
              categoryName={name}
              categoryId={identificator}
              imageUrl={imageUrl}
              url={articleUrl}
              key={index}
            />
          );
        })}
      </div>
      {articles.data.length > 9 && <ShowMoreButton />}
    </div>
  );
}
