import "./auth-page.css";
import { useReducer } from "react";
import { signupHandler, signupReducer } from "./authUtils";
import { Navbar } from "../../components";
import { SmileSVG } from "../../assets/svgReactComponents";
import styles from "./auth-page.module.css";

export default function SignOutPage() {
  return (
    <section className={`${styles["page-wrap"]}`}>
      <section className={`${styles["page-nav"]}`}>
        <Navbar></Navbar>
      </section>

      <section className={`${styles["page-main"]}`}>
        <main className={`${styles["main-content"]}`}>
          <div className="dui-auth-card dui-auth-card-logout dui-util-spc-mgn-m dui-util-bdr-radi-10px-m dui-util-gry-shdw">
            <SmileSVG></SmileSVG>
            <h2 className="dui-auth-card__title dui-util-fw-bld">
              You have been successfully logged out
            </h2>
          </div>
        </main>
      </section>
    </section>
  );
}
