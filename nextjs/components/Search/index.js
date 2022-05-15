import styles from "./Search.module.css";

export default function Search({ setSearchParam }) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchRow}>
        <input type="text" onChange={(e) => setSearchParam(e.target.value)} />
        <img
          src="/search.svg"
          className={styles.searchIcon}
          alt="search icon"
        />
      </div>
    </div>
  );
}
