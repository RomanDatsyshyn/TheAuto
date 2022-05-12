import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

  return (
    <>
      <header>
        <img
          src={isShowMenu ? "/close.svg" : "/menu.svg"}
          className={styles.menuIcon}
          alt={isShowMenu ? "close icon" : "menu icon"}
          onClick={() => setIsShowMenu(!isShowMenu)}
        />
        <Link href={"/"}>
          <a className={styles.logo}>TheAuto</a>
        </Link>
        <img
          src={isShowSearch ? "/close.svg" : "/search.svg"}
          className={styles.headerIcon}
          alt={isShowSearch ? "close icon" : "search icon"}
          onClick={() => setIsShowSearch(!isShowSearch)}
        />
      </header>
      {isShowSearch && (
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
      )}
      {isShowMenu && (
        <nav>
          <a href="#">їзда на механіці</a>
          <a href="#">поради</a>
          <a href="#">електроавтомобілі</a>
          <a href="#">їзда на механіці</a>
          <a href="#">їзда на механіці</a>
          <a href="#">їзда на механіці</a>
          <a href="#">їзда на механіці</a>
          <a href="#">їзда на механіці</a>
        </nav>
      )}
    </>
  );
}
