import React from "react";
import styles from "./historyVideosPage.module.css";

import { Card, Navbar, Sidebar } from "../../components";
import {
  useAuth,
  useHistory,
  useLikes,
  useVideos,
  useWatchLater,
} from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";
import { getItemCardData, deleteAllHistory } from "./historyVideosPageUtils";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HistoryVideosPage() {
  const { likesState, setLikesState } = useLikes();
  const { historyState, setHistoryState } = useHistory();
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

    const {
      response: historyResponse,
      loading: historyLoading,
      error: historyError,
    } = useAxios({
      method: "GET",
      url: "/api/user/history",
      headers: config.headers,
    });

    useEffect(() => {
      setHistoryState({
        type: "INIT_HISTORY",
        data: historyResponse,
      });
    }, [historyResponse, historyLoading, historyError]);
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

  const historyVideoIds = historyState.history.reduce((acc, cur) => {
    return [...acc, cur._id];
  }, []);

  const historyVideos = videosState.videos.filter((v) => {
    return historyVideoIds.find((e) => e === v._id) !== undefined;
  });

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles[`page-sidebar`]}`}>
        <Sidebar></Sidebar>
      </section>
      <section className={`${styles["page-main"]}`}>
        <p className={`dui-util-txt-reg`}>History ({historyVideos.length})</p>
        <button
          className={`${styles["btn-clear-history"]} dui-btn dui-btn--primary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
          onClick={() => {
            console.log("ff");
            deleteAllHistory(setHistoryState);
          }}
        >
          Clear All History
        </button>
        <div className={`${styles["video-list-holder"]}`}>
          {historyVideos.map((videoDetails) => {
            return (
              <Card
                key={videoDetails._id}
                itemCardData={getItemCardData({
                  videoDetails,
                  historyState,
                  setHistoryState,
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
