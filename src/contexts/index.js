import {
  useVideos,
  VideosContextProvider,
} from "./videosContext/videosContext";
import {
  useWatchLater,
  WatchLaterContextProvider,
} from "./watchLaterContext/watchLaterContext";
import { useAuth, AuthContextProvider } from "./authContext/authContext";
import {
  usePlaylist,
  PlaylistContextProvider,
} from "./playlistsContext/playlistsContext";
import { useLikes, LikesContextProvider } from "./likesContext/likesContext";
import {
  useHistory,
  HistorContextProvider,
} from "./historyContext/historyContext";

export {
  VideosContextProvider,
  useVideos,
  WatchLaterContextProvider,
  useWatchLater,
  AuthContextProvider,
  useAuth,
  PlaylistContextProvider,
  usePlaylist,
  useLikes,
  LikesContextProvider,
  useHistory,
  HistorContextProvider,
};
