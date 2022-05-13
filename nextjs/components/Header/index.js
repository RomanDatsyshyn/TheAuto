import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./Header.module.css";

const Search = dynamic(() => import("../Search"));
const Nav = dynamic(() => import("../Nav"));

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
      {isShowSearch && <Search />}
      {isShowMenu && <Nav />}
    </>
  );
}
