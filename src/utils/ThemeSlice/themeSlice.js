import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme: ["light", "dark"].includes(localStorage.getItem("currentTheme"))
    ? localStorage.getItem("currentTheme")
    : "light",
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("currentTheme", action.payload.updatedTheme);
      console.log(action);
      state.currentTheme = action.payload.updatedTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
