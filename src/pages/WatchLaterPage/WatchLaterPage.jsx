import styles from "./watchLaterPage.module.css";

import React from "react";
import { Card } from "../../components";

export default function WatchLaterPage() {
  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        {/* <Navbar></Navbar> */}
      </section>
      <section className={`${styles["page-main"]}`}>
        <p>My Watch Later List</p>
        <div className={`${styles["watch-later-list-holder"]}`}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => {
            return <Card key={k}></Card>;
          })}
        </div>
      </section>
    </section>
  );
}
