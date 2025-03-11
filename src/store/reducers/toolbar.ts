import { Reducer, createSlice } from "@reduxjs/toolkit";
import { Tool } from "@/components/toolbar/data";

const initialState = {
  selectedTool: Tool.Select,
  dock: true,
  selectedSubTool: null
};

export const slice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    selectTool: (state, action) => {
      state.selectedTool = action.payload;
      state.selectedSubTool = null;
    },
    selectSubTool: (state, action) => {
      state.selectedSubTool = action.payload;
    },
    clearTool: (state) => {
      state.selectedTool = null;
    },
    toggleDock: (state, action) => {
      state.dock = action.payload ?? !state.dock;
    }
  }
});

export const { clearTool, selectTool, selectSubTool, toggleDock } = slice.actions;

export default slice.reducer as Reducer<typeof initialState>;
