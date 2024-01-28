import { combineReducers } from "@reduxjs/toolkit";
import editor from "./editor";
import global from "./global";
import toolbar from "./toolbar";

export default combineReducers({
  editor,
  global,
  toolbar
});
