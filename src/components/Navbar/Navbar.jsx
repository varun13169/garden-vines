import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import { useAuth, useWishlist, useTheme } from "../../contexts";
// import {
//   MoonSVG,
//   SunSVG,
//   SearchSVG,
//   ShoppingCartSVG,
// } from "../../assets/svgReactComponents";

export default function Navbar() {
  // const { auth, checkValidTokenAndSetAuth } = useAuth();
  // const { isSignnedIn, token } = auth;
  const isSignnedIn = false;
  const navigate = useNavigate();

  // const { wishlist, setWishlist } = useWishlist();
  const wishlist = [];
  // const { theme, setTheme } = useTheme();
  // console.log(theme);

  return (
    <nav className="dui-nav-sch-act">
      <Link
        className="dui-nav-sch-act__logo dui-util-txt-decoration-none"
        to="/"
      >
        <h3 className="dui-util-fw-bld dui-primary-color">Garden Kart</h3>
      </Link>

      {/* <!-- Search --> */}
      <div className="dui-nav-sch-act__search dui-inp-txt dui-inp-txt--search">
        <i className="dui-inp-txt__icon dui-inp-txt__icon--search">
          {/* <SearchSVG></SearchSVG> */}
        </i>
        <label>
          <input
            className="dui-inp-txt__input dui-inp-txt__input--search dui-util-txt-sm dui-util-bdr-radi-5px-s reset-input-inherit-parent"
            type="text"
            placeholder="Search"
          />
        </label>
      </div>

      <ul className="dui-nav-sch-act__actions dui-ul">
        <li>
          <div className="dui-nav-sch-act__auth-actions">
            {isSignnedIn && (
              <>
                {/* <!-- SignOut Button --> */}
                <button
                  className="dui-nav-sch-act__signup-btn dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld reset-input-inherit-parent"
                  onClick={() => {
                    localStorage.removeItem("token");
                    checkValidTokenAndSetAuth();
                    navigate("/sign-out");
                  }}
                >
                  Sign Out
                </button>
              </>
            )}
            {!isSignnedIn && (
              <>
                {/* <!-- SignUp Button --> */}
                <Link
                  className="dui-nav-sch-act__signup-btn dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld"
                  to="/sign-up"
                >
                  Sign Up
                </Link>

                {/* <!-- Login Button --> */}
                <Link
                  className="dui-nav-sch-act__login-btn dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld"
                  to="/sign-in"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </li>

        {isSignnedIn && (
          <li>
            <Link
              className="dui-nav-sch-act__wish-lst-btn dui-util-disp-inline-block"
              to="/wishlist"
            >
              <div className="dui-badge dui-badge--round-ele-0_5-top-0_5-right">
                <div>{wishlist.length}</div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-heart"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#9A9A9A"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
            </Link>
          </li>
        )}

        {isSignnedIn && (
          <li>
            <Link className="dui-nav-sch-act__cart_lst-btn dui-link" to="/cart">
              <div className="dui-util-clr-prim-p2">
                <ShoppingCartSVG />
                <p className="dui-util-fw-bld dui-primary-color-p2">Cart</p>
              </div>
            </Link>
          </li>
        )}

        <li>
          <button
            className="dui-nav-sch-act__drk-mode-btn dui-btn reset-button-inherit-parent"
            onClick={() => {
              setTheme({
                ...theme,
                currentTheme: theme.currentTheme === "light" ? "dark" : "light",
              });
            }}
          >
            {/* {theme.currentTheme === "dark" && <SunSVG></SunSVG>}

            {theme.currentTheme === "light" && <MoonSVG></MoonSVG>} */}
          </button>
        </li>
      </ul>
    </nav>
  );
}
