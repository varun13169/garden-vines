import { createContext, useState, useContext } from "react";

const WatchLaterContext = createContext();

const WatchLaterContextProvider = ({ children }) => {
  const [watchLaterState, setWatchLaterState] = useState({ watchLater: [] });

  return (
    <WatchLaterContext.Provider value={{ watchLaterState, setWatchLaterState }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);
export { useWatchLater, WatchLaterContextProvider };
