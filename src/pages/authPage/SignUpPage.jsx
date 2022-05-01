import "./auth-page.css";
import { useReducer, useState } from "react";
import {
  signupHandler,
  signupReducer,
  isPassAndConfirmPassMatch,
} from "./authUtils";
import { Navbar } from "../../components";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router";
import styles from "./auth-page.module.css";

export default function SiginUpPage() {
  const [signupState, signupActionDispatch] = useReducer(signupReducer, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
                try {
                  e.preventDefault();
                  const res = await signupHandler(signupState);
                  checkValidTokenAndSetAuth();
                  signupActionDispatch({ type: "RESET_SIGNUP_FORM" });
                  setApiResponse((apiResponse) => ({
                    ...apiResponse,
                    res: res,
                    err: null,
                  }));
                  navigate("/"); // varundev: needs to fix
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
            <h2 className="dui-auth-card__title dui-util-fw-bld">Sign Up</h2>

            {/* <!-- Input Component Starts --> */}
            <div className="dui-inp-txt">
              <label
                htmlFor="first-name"
                className="dui-util-txt-sm dui-util-fw-sbld"
              >
                First Name
                <input
                  id="first-name"
                  className="dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent"
                  type="text"
                  placeholder="Adarsh"
                  value={signupState.firstName}
                  onChange={(e) =>
                    signupActionDispatch({
                      type: "FIRST_NAME_CHANGE",
                      data: { firstName: e.currentTarget.value },
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
                htmlFor="last-name"
                className="dui-util-txt-sm dui-util-fw-sbld"
              >
                Last Name
                <input
                  id="last-name"
                  className="dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent"
                  type="text"
                  placeholder="Balika"
                  value={signupState.lastName}
                  onChange={(e) =>
                    signupActionDispatch({
                      type: "LAST_NAME_CHANGE",
                      data: { lastName: e.currentTarget.value },
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
                htmlFor="email-id"
                className="dui-util-txt-sm dui-util-fw-sbld"
              >
                Email Address
                <input
                  id="email-id"
                  className="dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent"
                  type="text"
                  placeholder="sample@neog.camp"
                  value={signupState.email}
                  onChange={(e) =>
                    signupActionDispatch({
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
                className={`dui-util-txt-sm dui-util-fw-sbld ${
                  apiResponse.err && "dui-inp-txt__input--error"
                }`}
              >
                Password
                <input
                  id="password"
                  className={`dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent  ${
                    !isPassAndConfirmPassMatch(signupState) &&
                    "dui-inp-txt__input--error"
                  }`}
                  type="text"
                  placeholder="Password"
                  value={signupState.password}
                  onChange={(e) =>
                    signupActionDispatch({
                      type: "PASSWORD_CHANGE",
                      data: { password: e.currentTarget.value },
                    })
                  }
                />
                <p className="dui-util-txt-sm dui-util-disp-none">
                  *Please enter correct input
                </p>
              </label>
            </div>
            {/* <!-- Input Component Ends --> */}

            {/* <!-- Input Component Starts --> */}
            <div className="dui-inp-txt">
              <label
                htmlFor="confirm-password"
                className={`dui-util-txt-sm dui-util-fw-sbld ${
                  apiResponse.err && "dui-inp-txt__input--error"
                }`}
              >
                Confirm Password
                <input
                  id="confirm-password"
                  className={`dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent  ${
                    !isPassAndConfirmPassMatch(signupState) &&
                    "dui-inp-txt__input--error"
                  }`}
                  type="text"
                  placeholder="Confirm Password"
                  value={signupState.confirmPassword}
                  onChange={(e) =>
                    signupActionDispatch({
                      type: "CONFIRM_PASSWORD_CHANGE",
                      data: { confirmPassword: e.currentTarget.value },
                    })
                  }
                />
                {!isPassAndConfirmPassMatch(signupState) && (
                  <p className="dui-inp-txt__info-txt--error dui-util-txt-sm">
                    *Confirm Password is not same as Password.
                  </p>
                )}
              </label>
            </div>
            {/* <!-- Input Component Ends --> */}

            <div className="dui-auth-card__actions">
              <div className="dui-auth-card__sub-actions">
                {/* <!-- Checkbox Component Starts --> */}
                <label className="dui-inp-chkbox dui-util-txt-sm dui-util-disp-inline-block">
                  I accept all Terms &amp; Conditions
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="dui-inp-chkbox__checkmark"></span>
                </label>
                {/* <!-- Checkbox Component Ends --> */}
              </div>

              {/* <!-- Button Component Starts -- Primary --> */}
              <button
                type="submit"
                className="dui-btn dui-btn--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent"
              >
                Create New Account
              </button>
              {/* <!-- Button Component Ends -- Primary --> */}

              {/* <!-- Link Button Component Starts -- Link Txt Primary --> */}
              <a
                className="dui-link dui-link--txt-primary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-disp-block"
                href="#"
              >
                Already have an New Account
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
