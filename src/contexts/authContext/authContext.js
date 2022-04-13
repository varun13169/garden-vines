import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isSignnedIn: false, token: null });

  const checkValidTokenAndSetAuth = () => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken != null) {
      setAuth((auth) => ({
        ...auth,
        isSignnedIn: true,
        token: localStorageToken,
      }));
    } else {
      setAuth((auth) => ({
        ...auth,
        isSignnedIn: false,
        token: localStorageToken,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ auth, checkValidTokenAndSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthContextProvider, useAuth };
