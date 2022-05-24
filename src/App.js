import { Route, Routes } from "react-router-dom";
import {
  HistoryVideosPage,
  Homepage,
  LikedVideosPage,
  PlaylistPage,
  SignInPage,
  SignOutPage,
  SignUpPage,
  SingleVideoPage,
  VideoListingPage,
  WatchLaterPage,
} from "./pages";

import MockAPI from "./mockman/MockAPI";
import "./styles.css";
import { RequiresAuth } from "./components";
import { initTheme } from "./utils";
import { useSelector } from "react-redux";

export default function App() {
  const theme = useSelector((store) => store.themeSlice);
  console.log(useSelector((store) => store.themeSlice));

  return (
    <div className={"App   " + initTheme(theme)}>
      <Routes>
        <Route path="/" element={<VideoListingPage />}></Route>
        <Route path="/videos" element={<VideoListingPage />}></Route>

        <Route
          path="/history"
          element={
            <RequiresAuth>
              <HistoryVideosPage />
            </RequiresAuth>
          }
        ></Route>

        <Route
          path="/watch-later"
          element={
            <RequiresAuth>
              <WatchLaterPage />
            </RequiresAuth>
          }
        ></Route>

        <Route
          path="/playlists"
          element={
            <RequiresAuth>
              <PlaylistPage />
            </RequiresAuth>
          }
        ></Route>

        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <LikedVideosPage />
            </RequiresAuth>
          }
        ></Route>

        <Route path="/video/:id" element={<SingleVideoPage />}></Route>

        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/signout" element={<SignOutPage />}></Route>

        <Route path="/mock-api" element={<MockAPI />} />
      </Routes>
    </div>
  );
}
