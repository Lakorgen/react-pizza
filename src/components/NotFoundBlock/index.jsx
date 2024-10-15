import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Пожилая пустота
      </h1>
      <p className={styles.descr}>Такой страницы нет на нашем сайте</p>
    </div>
  );
};

export default NotFoundBlock;
