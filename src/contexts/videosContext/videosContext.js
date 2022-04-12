import { createContext } from "react";
import { useContext, useReducer } from "react";

const VideosContext = createContext();

const VideosContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const actionType = action.type;

    switch (actionType) {
      case "SET_FRESH_DATA":
        console.log(action.data?.videos);
        return {
          ...state,
          videos: action.data?.videos ? action.data.videos : [],
        };
    }
  };

  const [videosState, setVideosState] = useReducer(reducer, {
    videos: [],
  });

  return (
    <VideosContext.Provider value={{ videosState, setVideosState }}>
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosContextProvider };
