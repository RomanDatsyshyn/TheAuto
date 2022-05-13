import Link from "next/link";
import styles from "./ShowAllButton.module.css";

export function ShowAllButton() {
  return (
    <div className={styles.showMore}>
      <Link href={"/article/all"}>
        <a className={styles.showMoreText}>показати більше</a>
      </Link>
    </div>
  );
}
