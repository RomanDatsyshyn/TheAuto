import Link from "next/link";
import styles from "./NextPageButton.module.css";

export function NextPageButton({ nextPage }) {
  return (
    <div className={styles.showMore} onClick={nextPage}>
      <a className={styles.showMoreText}>показати більше</a>
    </div>
  );
}
