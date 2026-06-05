import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [downloads, setDownloads] = useState([]);

  return (
    <AppContext.Provider
      value={{
        favorites,
        setFavorites,
        downloads,
        setDownloads,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}