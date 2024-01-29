import { createSlice } from "@reduxjs/toolkit";

export const locationPlaceholder = "Type your location here";

const initialState = {
  cursor: null,
  showControls: false,
  grid: false,
  location: locationPlaceholder,
  selectedElementId: null,
  categories: [],
  seats: [],
  booths: [],
  text: []
};

export const slice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCursor: (state, action) => {
      state.cursor = action.payload;
    },
    clearCursor: (state) => {
      state.cursor = null;
    },
    toggleControls: (state) => {
      state.showControls = !state.showControls;
    },
    showControls: (state) => {
      state.showControls = true;
    },
    hideControls: (state) => {
      state.showControls = false;
    },
    toggleGrid: (state, action) => {
      state.grid = action.payload ?? !state.grid;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    selectElement: (state, action) => {
      state.selectedElementId = action.payload;
    },
    clearElement: (state) => {
      state.selectedElementId = null;
    }
  }
});

export const {
  setCursor,
  clearCursor,
  setLocation,
  selectElement,
  clearElement,
  toggleControls,
  showControls,
  hideControls,
  toggleGrid
} = slice.actions;

export default slice.reducer;
