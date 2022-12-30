import logger from "redux-logger";
import { combineReducers } from "redux";
import { postSlice } from "./post";
import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo";
import { albumSlice } from "./album";
import { commentSlice } from "./comment";
import { photoSlice } from "./photo";

const rootReducer = combineReducers({
  post: postSlice.reducer,
  todos: todoSlice.reducer,
  albums: albumSlice.reducer,
  comments: commentSlice.reducer,
  photos: photoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
