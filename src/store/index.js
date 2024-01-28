import { enhancer as withReduxEnhancer } from "@dreamworld/addon-redux";
import { configureStore } from "@reduxjs/toolkit";
import { default as rootReducer } from "./reducers";

const storybook = process.env.NODE_ENV === "storybook";

export function makeStore() {
  return configureStore({
    devTools: storybook,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["global/setCursor"],
          ignoredPaths: ["global.cursor"]
        }
      }),
    enhancers(getDefaultEnhancers) {
      const enhancers = [];
      if (storybook) {
        enhancers.push(withReduxEnhancer);
      }
      return getDefaultEnhancers().concat(enhancers);
    }
  });
}

export const store = makeStore();

export default { store };
