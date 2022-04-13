import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isSignnedIn: false,
    token: null,
  });

  const checkValidTokenAndSetAuth = () => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken != null) {
      setAuthState((authState) => ({
        ...authState,
        isSignnedIn: true,
        token: localStorageToken,
      }));
    } else {
      setAuthState((authState) => ({
        ...authState,
        isSignnedIn: false,
        token: localStorageToken,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, checkValidTokenAndSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthContextProvider, useAuth };
