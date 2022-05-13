import styles from "./LastAddedSection.module.css";
import { Heading } from "../Heading";
import { ShowAllButton } from "../ShowAllButton";
import { ArticleItem } from "../ArticleItem";

export function LastAddedSection({ articles = [] }) {
  return (
    <div className={styles.center}>
      <Heading title={"Останні додані"} />
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
      <ShowAllButton />
    </div>
  );
}
