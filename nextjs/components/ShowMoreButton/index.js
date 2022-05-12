import Link from "next/link";
import styles from "./ShowMoreButton.module.css";

export function ShowMoreButton({ id }) {
  return (
    <div className={styles.showMore}>
      <Link href={"/category/[id]"} as={`/category/${id}`}>
        <a className={styles.showMoreText}>показати більше</a>
      </Link>
    </div>
  );
}
