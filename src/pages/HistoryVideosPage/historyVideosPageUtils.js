import axios from "axios";
import { useAxios } from "../../customHooks";

//
const removeFromHistoryVideosAndSetHistoryState = ({
  videoDetails,
  historyState,
  setHistoryState,
}) => {
  setHistoryState({
    type: "UPDATE_HISTORY_LIST",
    data: {
      history: historyState.history.filter((e) => {
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
        "/api/user/history/" + videoDetails._id,
        config
      );
      // TODO: base on update API
      // setWishlist((wishlist) => res.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  })();
};

const removeFromHistory = ({ historyState, setHistoryState }) => {
  return (videoDetails) => {
    removeFromHistoryVideosAndSetHistoryState({
      videoDetails,
      historyState,
      setHistoryState,
    });
  };
};
//

/**
 * Add To Liked And Set LikedState
 * @param {Object} Object
 */
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

//
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
//

const deleteAllHistory = (setHistoryState) => {
  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  (async () => {
    try {
      let res = await axios.delete("/api/user/history/all", config);
      console.log(res);
      setHistoryState({
        type: "UPDATE_HISTORY_LIST",
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

const getItemCardData = ({
  videoDetails,
  historyState,
  setHistoryState,
  likesState,
  setLikesState,
}) => {
  const isInLikedVideos =
    likesState.likes.filter((likedVideo) => {
      return videoDetails._id === likedVideo._id;
    }).length !== 0;

  const res = {};
  res.videoDetails = { ...videoDetails };

  res.priAction = {
    name: "Remove from History",
    action: removeFromHistory({ historyState, setHistoryState }),
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

export { getItemCardData, deleteAllHistory };
