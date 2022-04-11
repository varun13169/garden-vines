import React from "react";
import { Card, Carousal } from "../../components";
import { Navbar } from "../../components";

import style from "./homepage.module.css";

export default function Homepage() {
  return (
    <section className={style.pageWrap}>
      <section className={style.pageNav}>
        <Navbar></Navbar>
      </section>
      <section className={style.pageHeader}>
        <Carousal></Carousal>
      </section>
      <section className={style.pageMain}>
        <h2 className="promo-catagory-header">Most Watch Videos</h2>
        <div className={style["promo-catagory-holder"]}>
          {[1, 2, 3, 4].map((k) => {
            return <Card key={k} />;
          })}
        </div>
      </section>
    </section>
  );
}
