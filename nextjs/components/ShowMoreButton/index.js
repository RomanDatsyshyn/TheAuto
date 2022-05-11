import styles from "./ShowMoreButton.module.css";

export function ShowMoreButton() {
  return (
    <div className={styles.showMore}>
      <div className={styles.showMoreText}>показати більше</div>
    </div>
  );
}
