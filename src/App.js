import { Route, Routes } from "react-router-dom";
import { Homepage, WatchLaterPage } from "./pages";

import MockAPI from "./mockman/MockAPI";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/watch-later" element={<WatchLaterPage />}></Route>

        <Route path="/mock-api" element={<MockAPI />} />
      </Routes>
    </div>
  );
}
