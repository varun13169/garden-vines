import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";

import App from "./App";
import { VideosContextProvider } from "./contexts";
// Call make Server
makeServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <VideosContextProvider>
        <App />
      </VideosContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
