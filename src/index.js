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
  VideosContextProvider,
  WatchLaterContextProvider,
} from "./contexts";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Call make Server
makeServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
