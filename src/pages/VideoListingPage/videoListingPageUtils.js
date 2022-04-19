import axios from "axios";
import { useAxios } from "../../customHooks";

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

const getItemCardData = ({
  videoDetails,
  watchLaterState,
  setWatchLaterState,
}) => {
  const isVideoInWatchLater =
    watchLaterState.watchLater.filter((video) => {
      return videoDetails._id === video._id;
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
  return res;
};

export { getItemCardData };
