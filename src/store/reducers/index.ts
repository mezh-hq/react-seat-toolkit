import { combineReducers } from "@reduxjs/toolkit";
import editor from "./editor";
import toolbar from "./toolbar";

export default combineReducers({
  editor,
  toolbar
});
