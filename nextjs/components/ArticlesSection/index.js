import styles from "./ArticlesSection.module.css";
import { Heading } from "../Heading";
import { ShowMoreButton } from "../ShowMoreButton";
import { ArticleItem } from "../ArticleItem";

export function ArticlesSection({
  categoryName = "",
  articles = [],
  categoryId,
}) {
  return (
    <div className={styles.center}>
      <Heading title={categoryName} />
      <div className={styles.cardContainer}>
        {articles &&
          articles.map((article, index) => {
            const {
              title,
              url: articleUrl,
              updatedAt,
              preview,
              categories,
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
      <ShowMoreButton id={categoryId} />
    </div>
  );
}
