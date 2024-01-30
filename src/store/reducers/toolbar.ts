import { createSlice } from "@reduxjs/toolkit";
import { Tool } from "@/components/toolbar/data";

const initialState = {
  selectedTool: Tool.Select
};

export const slice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    selectTool: (state, action) => {
      state.selectedTool = action.payload;
    },
    clearTool: (state) => {
      state.selectedTool = null;
    }
  }
});

export const { clearTool, selectTool } = slice.actions;

export default slice.reducer;
