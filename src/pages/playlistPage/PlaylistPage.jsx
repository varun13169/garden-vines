import styles from "./playlistPage.module.css";

import React from "react";
import { Card, Navbar, Sidebar } from "../../components";
import { useState, useEffect } from "react";
import { useLikes, usePlaylist } from "../../contexts";
import { BinSVG } from "../../assets/svgReactComponents";
import {
  onSubmitPlaylistForm,
  purgePlaylist,
  getItemCardData,
} from "./playlistPageUtils";

export default function PlaylistPage() {
  const [playlistInputNameState, setPlaylistInputNameState] = useState("");
  const [dispNewPlaylistForm, setDispNewPlaylistForm] = useState(false);
  const { playlistsState, setPlaylistsState } = usePlaylist();
  const [focusedPlaylistState, setFocusedPlaylistState] = useState({
    focusedPlaylist: null,
  });
  const { likesState, setLikesState } = useLikes();

  useEffect(() => {
    let playlistCount = playlistsState.playlists.length;
    if (playlistCount > 0) {
      setFocusedPlaylistState({ focusedPlaylist: playlistsState.playlists[0] });
    }
  }, []);

  useEffect(() => {
    console.log("ssddswedd");
    // debugger;
    let playlistCount = playlistsState.playlists.length;
    if (playlistCount === 0) {
      setFocusedPlaylistState((focusedPlaylist) => ({
        focusedPlaylist: null,
      }));
    } else if (
      playlistCount > 0 &&
      focusedPlaylistState.focusedPlaylist === null
    ) {
      setFocusedPlaylistState(() => ({
        focusedPlaylist: playlistsState.playlists[0],
      }));
    } else if (
      playlistCount > 0 &&
      focusedPlaylistState.focusedPlaylist !== null
    ) {
      const isPlaylistPresent =
        playlistsState.playlists.filter(
          (pl) => pl._id === focusedPlaylistState.focusedPlaylist._id
        ).length !== 0;

      if (isPlaylistPresent) {
        setFocusedPlaylistState(() => ({
          focusedPlaylist: playlistsState.playlists.find(
            (pl) => pl._id === focusedPlaylistState.focusedPlaylist._id
          ),
        }));
      } else {
        setFocusedPlaylistState(() => ({
          focusedPlaylist: playlistsState.playlists[0],
        }));
      }
    }
  }, [playlistsState]);

  console.log(focusedPlaylistState);

  return (
    <section className={`${styles[`page-wrap`]}`}>
      <section className={`${styles[`page-nav`]}`}>
        <Navbar></Navbar>
      </section>
      <section className={`${styles[`page-sidebar`]}`}>
        <Sidebar></Sidebar>
      </section>
      <section className={`${styles["page-main"]}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "1rem 3rem 1rem 3rem",
          }}
        >
          <p
            className={`dui-util-txt-md dui-util-fw-sbld dui-primary-color-p2`}
          >
            My Playists
          </p>
          <button
            className={`dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld reset-button-inherit-parent`}
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setDispNewPlaylistForm(true);
            }}
          >
            Create Playlist
          </button>
        </div>

        <div className={`${styles["playlist-holder"]}`}>
          {playlistsState.playlists.map((playlist) => {
            console.log(playlist);
            console.log(focusedPlaylistState._id === playlist._id);
            return (
              <button
                className={`${
                  focusedPlaylistState.focusedPlaylist !== null &&
                  focusedPlaylistState.focusedPlaylist._id === playlist._id
                    ? styles["focused-playlist"]
                    : ""
                } ${styles["playlist-btn"]} reset-button-inherit-parent`}
                key={playlist._id}
                onClick={() =>
                  setFocusedPlaylistState({
                    focusedPlaylist: playlist,
                  })
                }
              >
                <p
                  className="dui-util-fw-reg"
                  style={{ margin: "0rem 1rem 0rem 0rem" }}
                >
                  {playlist.title}
                </p>
                <button
                  className={`dui-btn dui-btn--primary reset-button-inherit-parent dui-util-bdr-radi-999px-mx`}
                  onClick={(e) => {
                    purgePlaylist(e, playlist._id, setPlaylistsState);
                  }}
                >
                  <BinSVG
                    style={{
                      stroke: "white",
                      width: "2em",
                      height: "2em",
                      padding: "0.5rem",
                    }}
                  />
                </button>
              </button>
            );
          })}
        </div>

        <div className={`${styles["video-list-holder"]}`}>
          {console.log(focusedPlaylistState?.focusedPlaylist)}
          {console.log(focusedPlaylistState?.focusedPlaylist?.videos)}
          {focusedPlaylistState.focusedPlaylist !== null &&
            focusedPlaylistState.focusedPlaylist.videos.map((videoDetails) => {
              const playlistDetails = focusedPlaylistState.focusedPlaylist;
              return (
                <Card
                  key={videoDetails._id}
                  itemCardData={getItemCardData({
                    videoDetails,
                    playlistDetails,
                    playlistsState,
                    setPlaylistsState,
                    likesState,
                    setLikesState,
                  })}
                ></Card>
              );
            })}
        </div>
      </section>

      {dispNewPlaylistForm === true && (
        <div className="dui-modal" style={{ backgroundColor: "#c2c2c2db" }}>
          <form
            className="dui-modal__info-card dui-util-spc-pad-s"
            onSubmit={(e) =>
              onSubmitPlaylistForm(
                e,
                playlistInputNameState,
                setPlaylistInputNameState,
                playlistsState,
                setPlaylistsState,
                setDispNewPlaylistForm
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
                setDispNewPlaylistForm(false);
              }}
            >
              X
            </p>
            <label
              htmlFor="playlist-name"
              className="dui-util-txt-sm dui-util-fw-sbld"
            >
              Please Enter New Playlist Name
              <input
                id="playlist-name"
                className={`dui-inp-txt__input dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-input-inherit-parent`}
                type="text"
                placeholder="Playlist Name"
                value={playlistInputNameState}
                onChange={(e) =>
                  setPlaylistInputNameState(
                    (playlistInputNameState) => e.target.value
                  )
                }
              />
            </label>
            <button
              type="submit"
              className={`dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-bld reset-button-inherit-parent`}
            >
              Create Playlist
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
