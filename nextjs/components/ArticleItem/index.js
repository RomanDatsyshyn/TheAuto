import styles from "./ArticleItem.module.css";
import Link from "next/link";

export function ArticleItem({
  title,
  categoryName,
  url,
  updatedAt,
  categoryId,
}) {
  const getDateFormat = () => {
    const date = new Date(updatedAt);
    const itemYear = date.getFullYear();
    const itemMonth = date.getMonth() + 1;
    const itemDay = date.getDate();

    const formatedDate = `${itemDay < 10 ? "0" + itemDay : itemDay}.${
      itemMonth < 10 ? "0" + itemMonth : itemMonth
    }.${itemYear}`;

    return formatedDate;
  };

  return (
    <div className={styles.card}>
      <a href="#1">
        <img src={`http://localhost:1337${url}`} alt="rover" />
      </a>
      <div className={styles.cardRow}>
        <span className={styles.cardDate}>{getDateFormat()}</span>
        <span className={styles.cardSlash}>/</span>
        <Link href={"/category/[id]"} as={`/category/${categoryId}`}>
          <a className={styles.cardCategory}>{categoryName}</a>
        </Link>
      </div>
      <a href="#3">
        <h4>{title}</h4>
      </a>
    </div>
  );
}
