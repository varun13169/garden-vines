import { useReducer, useContext, createContext } from "react";

const HistorContext = createContext();

const HistorContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const actionType = action.type;

    switch (actionType) {
      case "INIT_HISTORY":
        return {
          ...state,
          history: action.data?.history ? action.data.history : [],
        };
      case "ADD_VIDEO_TO_HISTORY":
        return {
          ...state,
          history: [...state.history, { ...action.data.videoDetails }],
        };
      case "UPDATE_HISTORY_LIST":
        return {
          ...state,
          history: action.data.history,
        };

      default:
        return { ...state };
    }
  };

  const [historyState, setHistoryState] = useReducer(reducer, {
    history: [],
  });

  return (
    <HistorContext.Provider value={{ historyState, setHistoryState }}>
      {children}
    </HistorContext.Provider>
  );
};

const useHistory = () => useContext(HistorContext);

export { useHistory, HistorContextProvider };
