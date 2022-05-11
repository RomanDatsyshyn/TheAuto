import styles from "./Heading.module.css";

export function Heading({ title = "" }) {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.line}></div>
      <div className={styles.heading}>{title}</div>
    </div>
  );
}
