import React from "react";
import styles from "./videoListingPage.module.css";

import { Card, Navbar } from "../../components";
import { useVideos } from "../../contexts";
import { useAxios } from "../../customHooks";
import { useEffect } from "react";

export default function VideoListingPage() {
  const { videosState, setVideosState } = useVideos();
  const { response, loading, error } = useAxios({
    method: "GET",
    url: "/api/videos",
    headers: {
      Accept: "*/*",
    },
  });

  useEffect(() => {
    console.log(response);
    console.log(loading);
    console.log(error);

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
        <div className={`${styles["watch-later-list-holder"]}`}>
          {videosState.videos.map((videoDetails) => {
            return (
              <Card
                key={videoDetails._id}
                itemCardData={{ videoDetails }}
              ></Card>
            );
          })}
        </div>
      </section>
    </section>
  );
}
