import axios from "axios";
import { v4 as uuid } from "uuid";

const onSubmitPlaylistForm = (
  e,
  playlistInputNameState,
  setPlaylistInputNameState,
  playlistsState,
  setPlaylistsState,
  setDispNewPlaylistForm
) => {
  e.preventDefault();
  const newPlaylistInfo = {
    title: playlistInputNameState,
    description: "",
  };
  // setPlaylistsState({
  //   type: "CREATE_NEW_PLAYLIST",
  //   data: { newPlaylistInfo, _id: "tempID" },
  // });

  setPlaylistsState({
    type: "UPDATE_PLAYLIST",
    data: {
      ...playlistsState,
      playlists: [
        ...playlistsState.playlists,
        {
          title: playlistInputNameState,
          description: "",
          videos: [],
          _id: uuid(),
        },
      ],
    },
  });

  setPlaylistInputNameState("");

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  (async () => {
    try {
      let res = await axios.post(
        "/api/user/playlists",
        { playlist: newPlaylistInfo },
        config
      );
      setDispNewPlaylistForm(false);

      setPlaylistsState({
        type: "SYNC_PLAYLISTS_INFO_WITH_BACKEND",
        data: res.data.playlists,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  })();
};

const purgePlaylist = (e, playlistId, setPlaylistsState) => {
  setPlaylistsState({
    type: "PURGE_PLAYLIST",
    data: playlistId,
  });

  let config = {
    headers: {
      Accept: "*/*",
      authorization: localStorage.getItem("token"),
    },
  };
  (async () => {
    try {
      let res = await axios.delete("/api/user/playlists/" + playlistId, config);

      setPlaylistsState({
        type: "SYNC_PLAYLISTS_INFO_WITH_BACKEND",
        data: res.data.playlists,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  })();
};

const removeVideoFromPlaylistAndSetPlaylistsState = ({
  videoDetails,
  playlistDetails,
  playlistsState,
  setPlaylistsState,
}) => {
  console.log("playlistsState");
  console.log(playlistsState);

  setPlaylistsState({
    type: "UPDATE_PLAYLIST",
    data: {
      ...playlistsState,
      playlists: playlistsState.playlists.map((pl) => {
        if (pl._id === playlistDetails._id) {
          return {
            ...pl,
            videos: pl.videos.filter((v) => !(v._d === videoDetails._id)),
          };
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

  (async () => {
    try {
      let res = await axios.post(
        `/api/user/playlists/${playlistDetails._id}/${videoDetails._id}`,
        config
      );
      // TODO: base on update API
      // setWishlist((wishlist) => res.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  })();
};

const removeVideoFromPlaylist = ({
  playlistDetails,
  playlistsState,
  setPlaylistsState,
}) => {
  return (videoDetails) => {
    removeVideoFromPlaylistAndSetPlaylistsState({
      videoDetails,
      playlistDetails,
      playlistsState,
      setPlaylistsState,
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
    try {
      let res = await axios.post("/api/user/likes", payload, config);
      // TODO: base on update API
      // setWishlist((wishlist) => res.data.wishlist);
    } catch (err) {
      console.log(err);
    }
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
  playlistDetails,
  playlistsState,
  setPlaylistsState,
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
    name: "Remove from Playlist",
    action: removeVideoFromPlaylist({
      playlistDetails,
      playlistsState,
      setPlaylistsState,
    }),
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

export { onSubmitPlaylistForm, purgePlaylist, getItemCardData };
