import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "../redux-slices/audioReducer";
import userSlice from "../redux-slices/userReducer";

export const store = configureStore({
  reducer: {
    audio: audioSlice,
    user: userSlice,
  },
});
