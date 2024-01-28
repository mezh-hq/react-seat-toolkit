import { createSlice } from "@reduxjs/toolkit";

export const locationPlaceholder = "Type your location here";

const initialState = {
  cursor: null,
  showControls: false,
  location: locationPlaceholder,
  selectedElement: null,
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
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    selectElement: (state, action) => {
      state.selectedElement = action.payload;
    }
  }
});

export const { setCursor, clearCursor, setLocation, selectElement, toggleControls, showControls, hideControls } =
  slice.actions;

export default slice.reducer;
