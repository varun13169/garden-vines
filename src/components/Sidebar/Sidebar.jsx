import React from "react";
import { Link } from "react-router-dom";
import {
  CompassSVG,
  PlaylistSVG,
  WishlistHeartSVG,
} from "../../assets/svgReactComponents";
import LikeSVG from "../../assets/svgReactComponents/LikeSVG";
import styles from "./sidebar.module.css";

function Sidebar() {
  return (
    <aside className={`${styles["sidebar-holder"]}`}>
      <ul className={`${styles["sidebar-link-list"]} dui-ul`}>
        <li>
          <Link className={`${styles["sidebar-link"]} dui-link`} to="/">
            <CompassSVG
              className={`${styles["sidebar-link-icons"]}`}
            ></CompassSVG>
            <p className="dui-util-txt-reg">Explore Videos</p>
          </Link>
        </li>
        <li>
          <Link className={`${styles["sidebar-link"]} dui-link`} to="/">
            <LikeSVG className={`${styles["sidebar-link-icons"]}`}></LikeSVG>
            <p className="dui-util-txt-reg">Liked</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${styles["sidebar-link"]} dui-link`}
            to="/playlists"
          >
            <PlaylistSVG
              className={`${styles["sidebar-link-icons"]}`}
            ></PlaylistSVG>
            <p className="dui-util-txt-reg">PlayList</p>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
