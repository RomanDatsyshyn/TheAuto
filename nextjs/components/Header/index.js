import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Search = dynamic(() => import("../Search"));
const Nav = dynamic(() => import("../Nav"));

export function Header({ menuCategories }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchResuls, setSearchResuls] = useState([]);

  const searchArticles = async (str) => {
    const url = `http://localhost:1337/api/articles?filters[title][$contains]=${str}`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResuls(data.data);
  };

  useEffect(() => {
    if (searchParam.length > 2) searchArticles(searchParam);
  }, [searchParam]);

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
          onClick={() => {
            setIsShowSearch(!isShowSearch);
            setSearchResuls([]);
          }}
        />
      </header>
      {isShowSearch && <Search setSearchParam={setSearchParam} />}
      {isShowMenu && <Nav menuCategories={menuCategories} />}
      {isShowSearch && searchResuls.length > 0 && (
        <div className={styles.searchContainer}>
          {searchResuls &&
            searchResuls.map((item, index) => {
              const { title, url } = item.attributes;
              return (
                <Link href={"/article/[id]"} as={`/article/${url}`} key={index}>
                  <a>{title.charAt(0).toUpperCase() + title.slice(1)}</a>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
}
