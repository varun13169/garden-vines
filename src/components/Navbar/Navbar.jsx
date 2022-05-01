import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts";
import LikeSVG from "../../assets/svgReactComponents/LikeSVG";
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

  const { authState, checkValidTokenAndSetAuth } = useAuth();
  const { isSignnedIn } = authState;
  const navigate = useNavigate();

  const wishlist = [];

  return (
    <nav className="dui-nav-sch-act">
      <Link
        className="dui-nav-sch-act__logo dui-util-txt-decoration-none"
        to="/"
      >
        <h3 className="dui-util-fw-bld dui-primary-color">Garden Vines</h3>
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
                    navigate("/signout");
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
                  to="/playlist"
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
            <button
              className="dui-nav-sch-act__signup-btn dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld reset-input-inherit-parent"
              onClick={() => {
                navigate("/playlists");
              }}
            >
              My Playlists
            </button>
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
