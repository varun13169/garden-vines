import React from "react";
import styles from "./watchLaterPage.module.css";

import { Card, Navbar, Sidebar } from "../../components";
import { useAuth, useLikes, useVideos, useWatchLater } from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";
import { getItemCardData } from "./watchLaterPageUtils";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WatchLaterPage() {
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

  const watchLaterVideosIds = watchLaterState.watchLater.reduce((acc, cur) => {
    return [...acc, cur._id];
  }, []);
  console.log(watchLaterVideosIds);

  const watchLaterVideos = videosState.videos.filter((v) => {
    return watchLaterVideosIds.find((e) => e === v._id) !== undefined;
  });
  console.log(watchLaterVideos);

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles[`page-sidebar`]}`}>
        <Sidebar></Sidebar>
      </section>
      <section className={`${styles["page-main"]}`}>
        <p className={`dui-util-txt-reg`}>
          Watch Later Videos ({watchLaterVideos.length})
        </p>
        <div className={`${styles["video-list-holder"]}`}>
          {watchLaterVideos.map((videoDetails) => {
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
