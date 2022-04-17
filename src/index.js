import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";

import App from "./App";
import {
  AuthContextProvider,
  PlaylistContextProvider,
  VideosContextProvider,
  WatchLaterContextProvider,
} from "./contexts";
import axios from "axios";
// Call make Server
makeServer();

//
const signupHandler = async () => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      firstName: "Adarsh",
      lastName: "Balika",
      email: "adarshbalika@neog.camp",
      password: "adarshBalika",
    });
    // saving the encodedToken in the localStorage
    localStorage.setItem("token", response.data.encodedToken);
  } catch (error) {
    console.log(error);
  }
};
signupHandler();
//

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PlaylistContextProvider>
          <VideosContextProvider>
            <WatchLaterContextProvider>
              <App />
            </WatchLaterContextProvider>
          </VideosContextProvider>
        </PlaylistContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
