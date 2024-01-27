import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTool: null
};

export const slice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    selectTool: (state, action) => {
      state.selectedTool = action.payload;
    }
  }
});

export const { selectTool } = slice.actions;

export default slice.reducer;
