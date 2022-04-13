import { Route, Routes } from "react-router-dom";
import {
  Homepage,
  SignInPage,
  SignOutPage,
  SignUpPage,
  VideoListingPage,
  WatchLaterPage,
} from "./pages";

import MockAPI from "./mockman/MockAPI";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/watch-later" element={<WatchLaterPage />}></Route>
        <Route path="/videos" element={<VideoListingPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/signout" element={<SignOutPage />}></Route>

        <Route path="/mock-api" element={<MockAPI />} />
      </Routes>
    </div>
  );
}
