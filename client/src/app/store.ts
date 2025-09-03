"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";


export const store = configureStore({
  reducer: {
    auth: ,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;