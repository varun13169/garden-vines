import React from "react";
import styles from "./card.module.css";

export default function Card() {
  return (
    <div
      className={`${styles.card} dui-util-bdr-radi-5px-s dui-util-spc-pad-s`}
    >
      <div className={styles["card__img-container"]}>
        <img
          className={styles["card__img"]}
          src="https://res.cloudinary.com/duepvqb5b/image/upload/v1648493127/gardenkart-products/products/helen-oreshchenko-973mk-bKc9k-unsplash_inibl5.jpg"
        />
      </div>
      <div className={`${styles["card__description"]} dui-util-spc-pad-xs`}>
        <p className={`dui-util-fw-sbld`} style={{ align: "left" }}>
          Title
        </p>
        <p>10 view</p>
      </div>
      <div className={`${styles["card__actions"]}`}>
        <button
          className={`${styles["card__watch-action"]} reset-button-inherit-parent`}
        >
          Watch Later
        </button>
      </div>
    </div>
  );
}
