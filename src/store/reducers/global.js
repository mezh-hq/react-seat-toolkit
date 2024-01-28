import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cursor: null,
  cursorHidden: false
};

export const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCursor: (state, action) => {
      state.cursor = action.payload;
    },
    clearCursor: (state) => {
      state.cursor = null;
    },
    hideCursor: (state) => {
      state.cursorHidden = true;
    },
    showCursor: (state) => {
      state.cursorHidden = false;
    }
  }
});

export const { setCursor, clearCursor, hideCursor, showCursor } = slice.actions;

export default slice.reducer;
