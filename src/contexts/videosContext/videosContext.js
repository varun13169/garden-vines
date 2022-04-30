import { createContext } from "react";
import { useContext, useReducer } from "react";
import { categories } from "../../backend/db/categories";

const VideosContext = createContext();

const VideosContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const actionType = action.type;

    switch (actionType) {
      case "SET_FRESH_DATA":
        return applyCategoryFilter({
          ...state,
          videos: action.data?.videos ? action.data.videos : [],
        });
      case "INIT_CATEGORIES":
        action.data = {
          categories: action.data?.categories ? action.data.categories : [],
        };
        action.data.categories.map((c) => {
          c.isSelected = false;
          return c;
        });
        return applyCategoryFilter({
          ...state,
          categories: [...state.categories, ...action.data.categories],
        });
      case "FILTER_BY_CATEGORY":
        const categoryId = action.data.categoryId;
        return applyCategoryFilter({
          ...state,
          categories: state.categories.map((c) => {
            c.isSelected = c._id === categoryId;
            return c;
          }),
          filterByCategory: state.categories.filter(
            (c) => c._id === categoryId
          )[0], // to get the only element in array
        });

      default:
        return { ...state };
    }
  };

  const [videosState, setVideosState] = useReducer(reducer, {
    videos: [],
    videosToShow: [],
    categories: [{ _id: "ALL", isSelected: true, categoryName: "All" }],
    filterByCategory: { _id: "ALL", isSelected: true, categoryName: "All" },
  });

  return (
    <VideosContext.Provider value={{ videosState, setVideosState }}>
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosContextProvider };

const applyCategoryFilter = (state) => {
  if (state.filterByCategory._id === "ALL") {
    return { ...state, videosToShow: [...state.videos] };
  }

  return {
    ...state,
    videosToShow: state.videos.filter(
      (v) => v.categoryId === state.filterByCategory._id
    ),
  };
};
