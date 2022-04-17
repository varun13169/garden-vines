import axios from "axios";

const onSubmitPlaylistForm = (
  e,
  playlistInputNameState,
  setPlaylistInputNameState,
  setPlaylistsState,
  setDispNewPlaylistForm
) => {
  e.preventDefault();
  const newPlaylistInfo = {
    title: playlistInputNameState,
    description: "",
  };
  setPlaylistsState({
    type: "CREATE_NEW_PLAYLIST",
    data: { newPlaylistInfo, _id: "tempID" },
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

export { onSubmitPlaylistForm, purgePlaylist };
