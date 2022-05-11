import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer>
      <div className={styles.footerLine}></div>
      <div className={styles.footerContainer}>
        <a href="#">Про нас</a>
        <a href="#">Контакти</a>
        <a href="#">Мапа сайту</a>
      </div>
      <div className={styles.copyright}>© 2022 TheAuto™</div>
    </footer>
  );
}
