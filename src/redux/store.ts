import {
  adoptReducer,
  adorableReducer,
  appReducer,
  cartReducer,
  userReducer,
} from "@/redux/slice";
import { app } from "@/redux/slice/appSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
export const store = configureStore({
  reducer: {
    userReducer,
    adorableReducer,
    cartReducer,
    appReducer,
    adoptReducer,
  },
});
setupListeners(store.dispatch);
