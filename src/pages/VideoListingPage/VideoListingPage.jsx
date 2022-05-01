import React from "react";
import styles from "./videoListingPage.module.css";

import { Card, Navbar, Sidebar } from "../../components";
import { useAuth, useLikes, useVideos, useWatchLater } from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";
import { getItemCardData } from "./videoListingPageUtils";
import axios from "axios";
import { Link } from "react-router-dom";

export default function VideoListingPage() {
  const { likesState, setLikesState } = useLikes();
  const { videosState, setVideosState } = useVideos();
  const { watchLaterState, setWatchLaterState } = useWatchLater();
  const { authState, checkValidTokenAndSetAuth } = useAuth();

  if (authState.isSignnedIn) {
    let config = {
      headers: {
        Accept: "*/*",
        authorization: localStorage.getItem("token"),
      },
    };

    const {
      response: likesResponse,
      loading: likesLoading,
      error: likesError,
    } = useAxios({
      method: "GET",
      url: "/api/user/likes",
      headers: config.headers,
    });

    useEffect(() => {
      setLikesState({
        type: "INIT_USER_LIKES",
        data: likesResponse,
      });
    }, [likesResponse, likesLoading, likesError]);
  }

  const { response, loading, error } = useAxios({
    method: "GET",
    url: "/api/videos",
    headers: {
      Accept: "*/*",
    },
  });

  useEffect(() => {
    setVideosState({
      type: "SET_FRESH_DATA",
      data: response,
    });
  }, [response, loading, error]);

  const {
    response: categoryResponse,
    loading: categoryLoading,
    error: categoryError,
  } = useAxios({
    method: "GET",
    url: "/api/categories",
    headers: {
      Accept: "*/*",
    },
  });

  useEffect(() => {
    setVideosState({
      type: "INIT_CATEGORIES",
      data: categoryResponse,
    });
  }, [categoryResponse, categoryLoading, categoryError]);

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles[`page-sidebar`]}`}>
        <Sidebar></Sidebar>
      </section>
      <section className={`${styles["page-main"]}`}>
        <div className={`${styles["category-list-holder"]}`}>
          {videosState.categories.map((category) => {
            const btnStyle = category.isSelected
              ? "dui-btn--primary"
              : "dui-btn--secondary";
            return (
              <button
                key={category._id}
                className={`${
                  styles[`category-btn`]
                } dui-btn ${btnStyle} dui-util-txt-sm dui-util-spc-pad-0_8rem-xs  dui-util-bdr-radi-999px-mx reset-button-inherit-parent`}
                onClick={() => {
                  setVideosState({
                    type: "FILTER_BY_CATEGORY",
                    data: { categoryId: category._id },
                  });
                }}
              >
                {category.categoryName}
              </button>
            );
          })}
        </div>
        <p className={`dui-util-txt-reg dui-primary-color-p2`}>
          Video ({videosState.videosToShow.length})
        </p>
        <div className={`${styles["video-list-holder"]}`}>
          {videosState.videosToShow.map((videoDetails) => {
            return (
              <Card
                key={videoDetails._id}
                itemCardData={getItemCardData({
                  videoDetails,
                  watchLaterState,
                  setWatchLaterState,
                  likesState,
                  setLikesState,
                })}
              ></Card>
            );
          })}
        </div>
      </section>
    </section>
  );
}
