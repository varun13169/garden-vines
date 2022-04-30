import React from "react";
import { WatchLaterSVG } from "../../assets/svgReactComponents";
import LikeSVG from "../../assets/svgReactComponents/LikeSVG";
import { Card, Navbar, Sidebar } from "../../components";
import { useParams } from "react-router-dom";

import styles from "./singleVideoPage.module.css";
import { useAuth, useLikes, useVideos, useWatchLater } from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";
import {
  addToWatchLater,
  removeFromWatchLater,
  addToLikedVideos,
  removeFromLikedVideos,
  getItemCardData,
} from "./singleVideoPageUtils";

export default function SingleVideoPage() {
  const { id } = useParams();
  const { videosState, setVideosState } = useVideos();
  const { likesState, setLikesState } = useLikes();
  const { watchLaterState, setWatchLaterState } = useWatchLater();
  const { authState, checkValidTokenAndSetAuth } = useAuth();

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
      response: watchLaterResponse,
      loading: watchLaterLoading,
      error: watchLaterError,
    } = useAxios({
      method: "GET",
      url: "/api/user/watchlater",
      headers: config.headers,
    });

    useEffect(() => {
      if (watchLaterResponse) {
        // ToDo: make loading work
        setWatchLaterState((watchLaterState) => {
          return {
            ...watchLaterState,
            watchLater: watchLaterResponse.watchlater,
          };
        });
      }
    }, [watchLaterResponse, watchLaterLoading, watchLaterError]);
  }

  const isInLikedVideos =
    likesState.likes.filter((likedVideo) => {
      return likedVideo._id === id;
    }).length !== 0;

  const isVideoInWatchLater =
    watchLaterState.watchLater.filter((watcLaterVideo) => {
      return watcLaterVideo._id === id;
    }).length !== 0;

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles[`page-sidebar`]}`}>
        <Sidebar></Sidebar>
      </section>
      <section className={`${styles[`page-main`]}`}>
        <div
          className={``}
          style={{ width: "fit-content", height: "fit-content" }}
        >
          {videosState.videos.find((video) => video._id === id) !==
            undefined && (
            <iframe
              className={`${styles[`video-player`]}`}
              src={videosState.videos.find((video) => video._id === id).src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          <div className={`${styles[`video-option`]}`}>
            <button
              className={`${
                styles[`option-button`]
              } reset-button-inherit-parent`}
              onClick={() => {
                const videoDetails = videosState.videos.find(
                  (video) => video._id === id
                );
                isInLikedVideos
                  ? removeFromLikedVideos({ likesState, setLikesState })(
                      videoDetails
                    )
                  : addToLikedVideos({ likesState, setLikesState })(
                      videoDetails
                    );
              }}
            >
              <LikeSVG className={`${styles[`option-img`]}`}></LikeSVG>
              <p className={`${styles[`option-txt`]}`}>
                {isInLikedVideos ? "Dislike" : "Like"}
              </p>
            </button>

            <button
              className={`${
                styles[`option-button`]
              } reset-button-inherit-parent`}
              onClick={() => {
                const videoDetails = videosState.videos.find(
                  (video) => video._id === id
                );
                isVideoInWatchLater
                  ? removeFromWatchLater({
                      watchLaterState,
                      setWatchLaterState,
                    })(videoDetails)
                  : addToWatchLater({ watchLaterState, setWatchLaterState })(
                      videoDetails
                    );
              }}
            >
              <WatchLaterSVG
                className={`${styles[`option-img`]}`}
              ></WatchLaterSVG>
              <p className={`${styles[`option-txt`]}`}>
                {isVideoInWatchLater
                  ? "Remove from Watch Later"
                  : "Add to Watch Later"}
              </p>
            </button>
          </div>
        </div>
      </section>
      {/* <section className={`${styles[`page-sidebar`]}`}>
        <p>Watch Later</p>

        <div className={`${styles[`watch-later-holder`]}`}>
          {watchLaterState.watchLater.map((watchLaterVideo) => {
            debugger;
            const videoDetails = videosState.videos.find(
              (video) => video._id === id
            );
            console.log("varundev: spv 2");
            console.log(videoDetails);
            return (
              <Card
                key={watchLaterVideo._id}
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
      </section> */}
    </section>
  );
}
