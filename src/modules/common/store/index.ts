import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../../../reducers/authReducer";
import { api } from "../api/api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});
