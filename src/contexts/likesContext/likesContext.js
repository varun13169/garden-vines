import { createContext, useContext, useReducer } from "react";

const LikesContext = createContext();

const LikesContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    const actionType = action.type;

    console.log(action);
    switch (actionType) {
      case "INIT_USER_LIKES":
        return { ...state, likes: action.data?.likes ? action.data.likes : [] };
      case "UPDATE_LIKES_LIST":
        return { ...state, likes: action.data.likes };
      default:
        console.log("DEFAULT");
    }
  };

  const [likesState, setLikesState] = useReducer(reducer, {
    likes: [],
  });

  return (
    <LikesContext.Provider value={{ likesState, setLikesState }}>
      {children}
    </LikesContext.Provider>
  );
};

const useLikes = () => useContext(LikesContext);

export { useLikes, LikesContextProvider };
