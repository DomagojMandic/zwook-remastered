import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "../redux-slices/audioReducer";

export const store = configureStore({
  reducer: {
    audio: audioSlice,
  },
});
