import Link from "next/link";
import styles from "./ArticlesContainer.module.css";
import { ArticleItem } from "../ArticleItem";

export function ArticlesContainer({ articles = [], title = "" }) {
  return (
    <section className={styles.center}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol className="breadcrumb">
          <li>
            <Link href={"/"}>
              <a>Головна</a>
            </Link>
          </li>
          <li>
            <span aria-current="location">{title}</span>
          </li>
        </ol>
      </nav>
      <div className={styles.cardContainer}>
        {articles &&
          articles.data &&
          articles.data.map((article, index) => {
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
    </section>
  );
}
