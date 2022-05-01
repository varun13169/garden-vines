import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CompassSVG,
  PlaylistSVG,
  WatchLaterSVG,
} from "../../assets/svgReactComponents";
import LikeSVG from "../../assets/svgReactComponents/LikeSVG";
import RotateSVG from "../../assets/svgReactComponents/RotateSVG";
import styles from "./sidebar.module.css";

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className={`${styles["sidebar-holder"]}`}>
      <ul className={`${styles["sidebar-link-list"]} dui-ul`}>
        <li>
          <Link className={`${styles["sidebar-link"]} dui-link`} to="/">
            <CompassSVG
              className={`${styles["sidebar-link-icons"]}`}
              stroke={
                pathname == "/"
                  ? "var(--dui-primary-color)"
                  : "var(--dui-primary-color-p2)"
              }
            ></CompassSVG>
            <p
              className={`dui-util-txt-reg ${
                pathname == "/" ? "dui-primary-color" : "dui-primary-color-p2"
              }`}
            >
              Explore Videos
            </p>
          </Link>
        </li>
        <li>
          <Link className={`${styles["sidebar-link"]} dui-link`} to="/liked">
            <LikeSVG
              className={`${styles["sidebar-link-icons"]}`}
              stroke={
                pathname == "/liked"
                  ? "var(--dui-primary-color)"
                  : "var(--dui-primary-color-p2)"
              }
            ></LikeSVG>
            <p
              className={`dui-util-txt-reg ${
                pathname == "/liked"
                  ? "dui-primary-color"
                  : "dui-primary-color-p2"
              }`}
            >
              Liked
            </p>
          </Link>
        </li>
        <li>
          <Link
            className={`${styles["sidebar-link"]} dui-link`}
            to="/playlists"
          >
            <PlaylistSVG
              className={`${styles["sidebar-link-icons"]}`}
              fill={
                pathname == "/playlists"
                  ? "var(--dui-primary-color)"
                  : "var(--dui-primary-color-p2)"
              }
            ></PlaylistSVG>
            <p
              className={`dui-util-txt-reg ${
                pathname == "/playlists"
                  ? "dui-primary-color"
                  : "dui-primary-color-p2"
              }`}
            >
              PlayList
            </p>
          </Link>
        </li>

        <li>
          <Link
            className={`${styles["sidebar-link"]} dui-link`}
            to="/watch-later"
          >
            <WatchLaterSVG
              className={`${styles["sidebar-link-icons"]}`}
              stroke={
                pathname == "/watch-later"
                  ? "var(--dui-primary-color)"
                  : "var(--dui-primary-color-p2)"
              }
            ></WatchLaterSVG>
            <p
              className={`dui-util-txt-reg ${
                pathname == "/watch-later"
                  ? "dui-primary-color"
                  : "dui-primary-color-p2"
              }`}
            >
              Watch Later
            </p>
          </Link>
        </li>

        <li>
          <Link className={`${styles["sidebar-link"]} dui-link`} to="/history">
            <RotateSVG
              className={`${styles["sidebar-link-icons"]}`}
              stroke={
                pathname == "/history"
                  ? "var(--dui-primary-color)"
                  : "var(--dui-primary-color-p2)"
              }
            ></RotateSVG>
            <p
              className={`dui-util-txt-reg ${
                pathname == "/history"
                  ? "dui-primary-color"
                  : "dui-primary-color-p2"
              }`}
            >
              History
            </p>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
