import { createSlice } from "@reduxjs/toolkit";
import booths from "./booths";
import seats from "./seats";
import text from "./text";

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
      state.text = text();
    },
    addSeat(state, action) {
      state.seats.push(action.payload);
    },
    deleteSeat(state, action) {
      state.seats = state.seats.filter((seat) => seat.id !== action.payload);
    },
    addBooth(state, action) {
      state.booths.push(action.payload);
    },
    deleteBooth(state, action) {
      state.booths = state.booths.filter((booth) => booth.id !== action.payload);
    },
    addText(state, action) {
      state.text.push(action.payload);
    },
    deleteText(state, action) {
      state.text = state.text.filter((text) => text.id !== action.payload);
    }
  }
});

export const {
  setCursor,
  clearCursor,
  setLocation,
  toggleControls,
  showControls,
  hideControls,
  toggleGrid,
  selectElement,
  deselectElement,
  clearElements,
  initializeElements,
  addSeat,
  deleteSeat,
  addBooth,
  deleteBooth,
  addText,
  deleteText
} = slice.actions;

export default slice.reducer;
