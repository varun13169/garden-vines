import axios from "axios";

const onSubmitAddToPlaylistForm = (
  e,
  dispAddToPlaylistFormState,
  setDispAddToPlaylistFormState,
  playlistsState,
  setPlaylistsState,
  playlistId
) => {
  e.preventDefault();

  if (playlistId === null) {
    return;
  }

  playlistsState.playlists;
  setPlaylistsState({
    type: "UPDATE_PLAYLIST",
    data: {
      ...playlistsState,
      playlists: playlistsState.playlists.map((pl) => {
        if (pl._id === playlistId) {
          console.log(pl);
          if (
            pl.videos.filter((v) => dispAddToPlaylistFormState._id === v._id)
              .length === 0
          ) {
            return {
              ...pl,
              videos: [...pl.videos, dispAddToPlaylistFormState],
            };
          }
        }
        return pl;
      }),
    },
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };

  let payload = { video: dispAddToPlaylistFormState };
  (async () => {
    try {
      let res = await axios.post(
        "/api/user/playlists/" + playlistId,
        payload,
        config
      );
      //Todo: syc with api call
    } catch (err) {
      console.log(err);
    }
  })();

  setDispAddToPlaylistFormState(null);
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

const getItemCardData = ({
  videoDetails,
  dispAddToPlaylistFormState,
  setDispAddToPlaylistFormState,
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
    name: "Add to Playlist",
    action: setDispAddToPlaylistFormState,
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

export { getItemCardData, onSubmitAddToPlaylistForm };
