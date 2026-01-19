// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../hooks/Auth.hooks";
import { blogsApi } from "../hooks/Blogs.hooks";

export const store = configureStore({
  reducer: {
   [blogsApi.reducerPath]: blogsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogsApi.middleware)
      .concat(authApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
