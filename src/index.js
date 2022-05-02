import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";

import App from "./App";
import {
  AuthContextProvider,
  HistorContextProvider,
  LikesContextProvider,
  PlaylistContextProvider,
  ThemeContextProvider,
  VideosContextProvider,
  WatchLaterContextProvider,
} from "./contexts";
import axios from "axios";
// Call make Server
makeServer();

// // Uncomment and set isSignnedIn to true to debug
// const signupHandler = async () => {
//   try {
//     const response = await axios.post(`/api/auth/signup`, {
//       firstName: "Adarsh",
//       lastName: "Balika",
//       email: "adarshbalika@neog.camp",
//       password: "adarshBalika",
//     });
//     // saving the encodedToken in the localStorage
//     localStorage.setItem("token", response.data.encodedToken);
//   } catch (error) {
//     console.log(error);
//   }
// };
// signupHandler();
// // Uncomment to debug

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <PlaylistContextProvider>
            <VideosContextProvider>
              <LikesContextProvider>
                <HistorContextProvider>
                  <WatchLaterContextProvider>
                    <App />
                  </WatchLaterContextProvider>
                </HistorContextProvider>
              </LikesContextProvider>
            </VideosContextProvider>
          </PlaylistContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
