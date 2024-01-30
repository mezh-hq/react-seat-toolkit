import { createSlice } from "@reduxjs/toolkit";
import booths from "./booths";
import seats from "./seats";

export const locationPlaceholder = "Type your location here";

const initialState = {
  cursor: null,
  showControls: false,
  grid: false,
  location: locationPlaceholder,
  selectedElementIds: [],
  lastDeselectedElementId: null,
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
      state.selectedElementIds = state.selectedElementIds.concat(action.payload);
    },
    deselectElement: (state, action) => {
      state.lastDeselectedElementId = action.payload;
      state.selectedElementIds = state.selectedElementIds.filter((id) => id !== action.payload);
    },
    clearElements: (state) => {
      state.selectedElementIds = [];
    },
    initializeElements: (state) => {
      state.seats = seats();
      state.booths = booths();
      console.log(state.seats);
    }
  }
});

export const {
  setCursor,
  clearCursor,
  setLocation,
  selectElement,
  deselectElement,
  clearElements,
  initializeElements,
  toggleControls,
  showControls,
  hideControls,
  toggleGrid
} = slice.actions;

export default slice.reducer;
