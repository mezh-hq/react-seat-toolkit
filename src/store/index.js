import { configureStore } from "@reduxjs/toolkit";
import { default as rootReducer } from "./reducers";

export function makeStore() {
  return configureStore({
    devTools: import.meta.env.VITE_APP_ENV !== "production",
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["global/setCursor"],
          ignoredActionPaths: ["meta.arg", "payload.timestamp"],
          ignoredPaths: ["global.cursor"]
        }
      })
  });
}

export const store = makeStore();

export default { store };
