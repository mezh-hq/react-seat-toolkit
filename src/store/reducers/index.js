import { combineReducers } from "@reduxjs/toolkit";
import global from "./global";
import toolbar from "./toolbar";

export default combineReducers({
  global,
  toolbar
});
