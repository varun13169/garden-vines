import React from "react";
import styles from "./videoListingPage.module.css";

import { Card, Navbar } from "../../components";
import { useAuth, useLikes, useVideos, useWatchLater } from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";
import { getItemCardData } from "./videoListingPageUtils";
import axios from "axios";

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

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles["page-main"]}`}>
        <p>All Videos in Library</p>
        <div className={`${styles["video-list-holder"]}`}>
          {videosState.videos.map((videoDetails) => {
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
