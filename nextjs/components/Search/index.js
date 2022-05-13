import styles from "./Search.module.css";

export default function Search() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchRow}>
        <input type="text" />
        <img
          src="/search.svg"
          className={styles.searchIcon}
          alt="search icon"
        />
      </div>
    </div>
  );
}
