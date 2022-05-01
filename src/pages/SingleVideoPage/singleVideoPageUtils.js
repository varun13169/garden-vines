import axios from "axios";

const removeFromLikedVideosAndSetLikedState = ({
  videoDetails,
  likesState,
  setLikesState,
}) => {
  setLikesState({
    type: "UPDATE_LIKES_LIST",
    data: {
      likes: likesState.likes.filter((e) => {
        return e._id !== videoDetails._id;
      }),
    },
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  (async () => {
    try {
      let res = await axios.delete(
        "/api/user/likes/" + videoDetails._id,
        config
      );
      // TODO: base on update API
      // setWishlist((wishlist) => res.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  })();
};

const removeFromLikedVideos = ({ likesState, setLikesState }) => {
  return (videoDetails) => {
    removeFromLikedVideosAndSetLikedState({
      videoDetails,
      likesState,
      setLikesState,
    });
  };
};

const addToLikedVideosAndSetLikedState = ({
  itemDetails,
  likesState,
  setLikesState,
}) => {
  setLikesState({
    type: "UPDATE_LIKES_LIST",
    data: {
      likes: [...likesState.likes, itemDetails],
    },
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  let payload = { video: itemDetails };
  (async () => {
    let res = await axios.post("/api/user/likes", payload, config);
    // TODO: base on update API
    // setWishlist((wishlist) => res.data.wishlist);
  })();
};

const addToLikedVideos = ({ likesState, setLikesState }) => {
  return (itemDetails) => {
    addToLikedVideosAndSetLikedState({
      itemDetails,
      likesState,
      setLikesState,
    });
  };
};

/**
 * Remove From Wishlist And Set Wishlist
 * @param {Object} Object
 */
const removeFromWatchLaterAndSetWatchLater = ({
  videoDetails,
  watchLaterState,
  setWatchLaterState,
}) => {
  setWatchLaterState((watchLaterState) => {
    return {
      ...watchLaterState,
      watchLater: watchLaterState.watchLater.filter(
        (e) => e._id !== videoDetails._id
      ),
    };
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  (async () => {
    try {
      let res = await axios.delete(
        "/api/user/watchlater/" + videoDetails._id,
        config
      );
      setWatchLaterState((watchLaterState) => {
        return { watchLater: res.data.watchlater };
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

/**
 * Remove From Wishlist
 * @param {Object} Object
 * @return {removeFromWishlistAndSetWishlist} removeFromWishlistAndSetWishlist
 */
const removeFromWatchLater = ({ watchLaterState, setWatchLaterState }) => {
  return (videoDetails) => {
    removeFromWatchLaterAndSetWatchLater({
      videoDetails,
      watchLaterState,
      setWatchLaterState,
    });
  };
};

/**
 * Add To Wishlist And Set Wishlist
 * @param {Object} Object
 */
const addToWatchLaterAndSetWatchLater = ({
  videoDetails,
  watchLaterState,
  setWatchLaterState,
}) => {
  setWatchLaterState((watchLaterState) => ({
    ...watchLaterState,
    watchLater: [...watchLaterState.watchLater, { ...videoDetails }],
  }));

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  let payload = { video: videoDetails };
  (async () => {
    try {
      let res = await axios.post("/api/user/watchlater", payload, config);
      setWatchLaterState((watchLaterState) => {
        return { watchLater: res.data.watchlater };
      });
    } catch (err) {
      console.log(error);
    }
  })();
};

/**
 * Add To Wishlist
 * @param {Object} Object
 * @return {removeFromWishlistAndSetWishlist} removeFromWishlistAndSetWishlist
 */
const addToWatchLater = ({ watchLaterState, setWatchLaterState }) => {
  return (videoDetails) => {
    addToWatchLaterAndSetWatchLater({
      videoDetails,
      watchLaterState,
      setWatchLaterState,
    });
  };
};

const addToHistoryVideosAndSetHistoryState = ({
  itemDetails,
  historyState,
  setHistoryState,
}) => {
  setLikesState({
    type: "UPDATE_HISTORY",
    data: {
      history: [...historyState.history, itemDetails],
    },
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  let payload = { video: itemDetails };
  (async () => {
    let res = await axios.post("/api/user/history", payload, config);
    // TODO: base on update API
    // setWishlist((wishlist) => res.data.wishlist);
  })();
};

const addToHistoryVideos = ({ historyState, setHistoryState }) => {
  return (itemDetails) => {
    addToHistoryVideosAndSetHistoryState({
      itemDetails,
      historyState,
      setHistoryState,
    });
  };
};

const getItemCardData = ({
  videoDetails,
  watchLaterState,
  setWatchLaterState,
  likesState,
  setLikesState,
}) => {
  console.log("Varunde: spv");
  console.log(watchLaterState);

  const isVideoInWatchLater =
    watchLaterState.watchLater.filter((video) => {
      console.log(video);
      console.log(video._id);
      console.log(videoDetails._id);
      console.log(videoDetails._id === video._id);
      return videoDetails._id === video._id;
    }).length !== 0;

  const isInLikedVideos =
    likesState.likes.filter((likedVideo) => {
      return videoDetails._id === likedVideo._id;
    }).length !== 0;

  const res = {};
  res.videoDetails = { ...videoDetails };

  res.priAction = isVideoInWatchLater
    ? {
        name: "Remove from Watch Later",
        action: removeFromWatchLater({ watchLaterState, setWatchLaterState }),
      }
    : {
        name: "Add to Watch Later",
        action: addToWatchLater({ watchLaterState, setWatchLaterState }),
      };

  res.likeAction = isInLikedVideos
    ? {
        isInLikedVideos: isInLikedVideos,
        action: removeFromLikedVideos({ likesState, setLikesState }),
      }
    : {
        isInLikedVideos: isInLikedVideos,
        action: addToLikedVideos({ likesState, setLikesState }),
      };
  return res;
};

export {
  addToWatchLater,
  removeFromWatchLater,
  addToLikedVideos,
  removeFromLikedVideos,
  addToHistoryVideosAndSetHistoryState,
  addToHistoryVideos,
  getItemCardData,
};
