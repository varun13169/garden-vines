import { createContext, useReducer, useContext } from "react";

const PlaylistContext = createContext();

const PlaylistContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const actionType = action.type;

    switch (actionType) {
      case "CREATE_NEW_PLAYLIST":
        const newPlaylistInfo = action.data;
        return {
          ...state,
          playlists: [...state.playlists, { ...newPlaylistInfo, video: [] }],
        };
      case "SYNC_PLAYLISTS_INFO_WITH_BACKEND":
        const playlists = action.data;
        return {
          ...state,
          playlists: [...playlists],
        };
      case "PURGE_PLAYLIST":
        const playlistId = action.data;
        return {
          ...state,
          playlists: state.playlists.filter((playlist) => {
            return playlist._id !== playlistId;
          }),
        };

      case "UPDATE_PLAYLIST":
        console.log("varundev: UPDATE_PLAYLIST");
        console.log(action.data);
        return action.data;

      default:
        console.log("Default");
    }
  };
  const [playlistsState, setPlaylistsState] = useReducer(reducer, {
    playlists: [],
  });
  return (
    <PlaylistContext.Provider value={{ playlistsState, setPlaylistsState }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistContextProvider };
