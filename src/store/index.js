import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { default as rootReducer } from "./reducers";

export function makeStore() {
  return configureStore({
    devTools: import.meta.env.VITE_APP_ENV !== "production",
    reducer: combineReducers(rootReducer)
  });
}

export const store = makeStore();

export default { store };
