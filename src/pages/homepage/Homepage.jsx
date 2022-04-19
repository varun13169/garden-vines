import style from "./homepage.module.css";
import React from "react";
import { Card, Carousal } from "../../components";
import { Navbar } from "../../components";
import { useEffect } from "react";
import { useAxios } from "../../customHooks";
import axios from "axios";
import { useVideos } from "../../contexts";

export default function Homepage() {
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

  console.log("Varun");
  console.log(videosState.videos);
  return (
    <section className={style.pageWrap}>
      <section className={style.pageNav}>
        <Navbar></Navbar>
      </section>
      <section className={style.pageHeader}>
        <Carousal></Carousal>
      </section>
      <section className={style.pageMain}>
        <h2 className="promo-catagory-header">Most Watch Videos</h2>
        <div className={style["promo-catagory-holder"]}>
          {videosState.videos.map((video) => {
            return <Card key={video._id} props={{}} />;
          })}
        </div>
      </section>
    </section>
  );
}
