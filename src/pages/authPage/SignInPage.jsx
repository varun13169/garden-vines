import "./auth-page.css";
import "./auth-page.css";
import { useReducer, useState } from "react";
import { signinHandler, signinReducer } from "./authUtils";
import { Navbar } from "../../components";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router";
import styles from "./auth-page.module.css";

export default function SiginInPage() {
  const [loginState, loginActionDispatch] = useReducer(signinReducer, {
    email: "",
    password: "",
  });
  const [apiResponse, setApiResponse] = useState({
    err: null,
    res: null,
  });

  const { authState, checkValidTokenAndSetAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <section className={`${styles["page-wrap"]}`}>
      <section className={`${styles["page-nav"]}`}>
        <Navbar></Navbar>
      </section>

      <section className={`${styles["page-sidebar"]}`}></section>

      <section className={`${styles["page-main"]}`}>
        <main className={`${styles["main-content"]}`}>
          <form
            className="dui-auth-card dui-util-bdr-radi-10px-m dui-util-gry-shdw"
            onSubmit={(e) => {
              (async () => {
                e.preventDefault();
                try {
                  const res = await signinHandler(loginState);
                  checkValidTokenAndSetAuth();
                  // navigate("/"); // varundev: need to fix this
                  loginActionDispatch({ type: "RESET_LOGIN_FORM" });
                  setApiResponse((apiResponse) => ({
                    ...apiResponse,
                    res: res,
                    err: null,
                  }));
                } catch (err) {
                  console.log(err);
                  setApiResponse((apiResponse) => ({
                    ...apiResponse,
                    err: err,
                    res: null,
                  }));
                  throw err;
                }
              })();
            }}
          >
            <h2 className="dui-auth-card__title dui-util-fw-bld">Sign In</h2>
            {/* <!-- Input Component Starts --> */}
            <div className="dui-inp-txt">
              <label
                htmlFor="email-id"
                className="dui-util-txt-sm dui-util-fw-sbld"
              >
                Email Address
                <input
                  id="email-id"
                  className={`dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent ${
                    apiResponse.err && "dui-inp-txt__input--error"
                  }`}
                  type="text"
                  placeholder="sample@neog.camp"
                  value={loginState.email}
                  onChange={(e) =>
                    loginActionDispatch({
                      type: "EMAIL_CHANGE",
                      data: { email: e.currentTarget.value },
                    })
                  }
                />
                <p className="dui-util-txt-xsm dui-util-disp-none">
                  *Some Additional Info
                </p>
              </label>
            </div>
            {/* <!-- Input Component Ends --> */}

            {/* <!-- Input Component Starts --> */}
            <div className="dui-inp-txt">
              <label
                htmlFor="password"
                className="dui-util-txt-sm dui-util-fw-sbld"
              >
                Password
                <input
                  id="password"
                  className={`dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent ${
                    apiResponse.err && "dui-inp-txt__input--error"
                  }`}
                  type="password"
                  placeholder="Password"
                  value={loginState.password}
                  onChange={(e) =>
                    loginActionDispatch({
                      type: "PASSWORD_CHANGE",
                      data: { password: e.currentTarget.value },
                    })
                  }
                />
                {apiResponse.err && (
                  <p className="dui-inp-txt__info-txt--error dui-util-txt-sm">
                    *Incorrect login credentials.
                  </p>
                )}
              </label>
            </div>
            {/* <!-- Input Component Ends --> */}

            <div className="dui-auth-card__actions">
              <div className="dui-auth-card__sub-actions">
                {/* <!-- Checkbox Component Starts --> */}
                <label className="dui-inp-chkbox dui-util-txt-sm dui-util-disp-inline-block">
                  Remember me
                  <input type="checkbox" checked="checked" />
                  <span className="dui-inp-chkbox__checkmark"></span>
                </label>
                {/* <!-- Checkbox Component Ends --> */}

                {/* <!-- Link Button Component Starts -- Link Txt Primary --> */}
                <a
                  className="dui-link dui-link--txt-primary dui-util-txt-sm"
                  href="#"
                >
                  Forgot your Password ?
                </a>
                {/* <!-- Link Button Component Ends -- Link Txt Primary --> */}
              </div>

              {/* <!-- Button Component Starts -- Primary --> */}
              <button
                type="submit"
                className="dui-btn dui-btn--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent"
              >
                Login
              </button>
              {/* <!-- Button Component Ends -- Primary --> */}

              {/* <!-- Link Button Component Starts -- Link Txt Primary --> */}
              <a
                className="dui-link dui-link--txt-primary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-disp-block"
                href="#"
              >
                Create a New Account
              </a>
              {/* <!-- Link Button Component Ends -- Link Txt Primary --> */}
            </div>
          </form>
        </main>
      </section>

      <section className={`${styles["page-footer"]}`}>
        <footer className="footer">Some Footer Information</footer>
      </section>
    </section>
  );
}
