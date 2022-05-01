import React from "react";
import styles from "./likedVideosPage.module.css";

import { Card, Navbar, Sidebar } from "../../components";
import {
  useAuth,
  useLikes,
  usePlaylist,
  useVideos,
  useWatchLater,
} from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";
import {
  getItemCardData,
  onSubmitAddToPlaylistForm,
} from "./likedVideosPageUtils";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LikedVideosPage() {
  const [dispAddToPlaylistFormState, setDispAddToPlaylistFormState] =
    useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const { likesState, setLikesState } = useLikes();
  const { videosState, setVideosState } = useVideos();
  const { watchLaterState, setWatchLaterState } = useWatchLater();
  const { playlistsState, setPlaylistsState } = usePlaylist();
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

  const likedVideoIds = likesState.likes.reduce((acc, cur) => {
    return [...acc, cur._id];
  }, []);
  console.log(likedVideoIds);

  const likedVideos = videosState.videos.filter((v) => {
    return likedVideoIds.find((e) => e === v._id) !== undefined;
  });
  console.log(likedVideos);

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles[`page-sidebar`]}`}>
        <Sidebar></Sidebar>
      </section>
      <section className={`${styles["page-main"]}`}>
        <p className={`dui-util-txt-reg dui-primary-color-p2`}>
          Liked Videos ({likedVideos.length})
        </p>
        <div className={`${styles["video-list-holder"]}`}>
          {likedVideos.map((videoDetails) => {
            return (
              <Card
                key={videoDetails._id}
                itemCardData={getItemCardData({
                  videoDetails,
                  dispAddToPlaylistFormState,
                  setDispAddToPlaylistFormState,
                  likesState,
                  setLikesState,
                })}
              ></Card>
            );
          })}
        </div>
      </section>

      {dispAddToPlaylistFormState !== null && (
        <div className="dui-modal" style={{ backgroundColor: "#c2c2c2db" }}>
          <form
            className="dui-modal__info-card dui-util-spc-pad-s"
            onSubmit={(e) =>
              onSubmitAddToPlaylistForm(
                e,
                dispAddToPlaylistFormState,
                setDispAddToPlaylistFormState,
                playlistsState,
                setPlaylistsState,
                selectedPlaylistId
              )
            }
            style={{
              width: "fit-content",
              height: "fit-content",
              backgroundColor: "var(--site-bg-color)",
            }}
          >
            <p
              className="dui-modal__close"
              onClick={() => {
                setDispAddToPlaylistFormState(null);
              }}
            >
              X
            </p>

            {playlistsState.playlists.map((pl) => {
              console.log(pl);

              return (
                <label
                  htmlFor={pl._id}
                  key={pl._id}
                  className="dui-inp-radio-btn dui-util-txt-sm"
                >
                  {pl.title}
                  <input
                    id={pl._id}
                    type="radio"
                    name="playlist-selection"
                    onClick={() => {
                      setSelectedPlaylistId(pl._id);
                    }}
                  />
                  <span class="dui-inp-radio-btn__checkmark"></span>
                </label>
              );
            })}

            <button
              type="submit"
              className={`dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld reset-button-inherit-parent`}
            >
              Add to Playlist
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
