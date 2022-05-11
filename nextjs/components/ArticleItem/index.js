import styles from "./ArticleItem.module.css";

export function ArticleItem({ title, categoryName, url, updatedAt }) {
  const date = new Date(updatedAt);
  return (
    <div className={styles.card}>
      <a href="#1">
        <img src={`http://localhost:1337${url}`} alt="rover" />
      </a>
      <div className={styles.cardRow}>
        <span className={styles.cardDate}>
          {date.toLocaleDateString("en-US").replace("/", ".")}
        </span>
        <span className={styles.cardSlash}>/</span>
        <a href="#2" className={styles.cardCategory}>
          {categoryName}
        </a>
      </div>
      <a href="#3">
        <h4>{title}</h4>
      </a>
    </div>
  );
}
