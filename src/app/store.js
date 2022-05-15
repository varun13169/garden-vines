import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../utils/ThemeSlice/themeSlice";

export const store = configureStore({
  reducer: {
    themeSlice: themeSlice,
  },
});
