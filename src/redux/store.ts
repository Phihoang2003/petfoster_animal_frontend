import { adorableReducer, cartReducer, userReducer } from "@/redux/slice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
export const store = configureStore({
  reducer: {
    userReducer,
    adorableReducer,
    cartReducer,
  },
});
setupListeners(store.dispatch);
