import { configureStore } from "@reduxjs/toolkit";
import { default as rootReducer } from "./reducers";

const storybook = process.env.NODE_ENV === "storybook";

let withReduxEnhancer;

if (storybook) {
  // @ts-expect-error - This is a dynamic import
  withReduxEnhancer = (await import("@dreamworld/addon-redux")).enhancer;
}

export function makeStore() {
  return configureStore({
    devTools: storybook,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["editor/setCursor"],
          ignoredPaths: ["editor.cursor"]
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
