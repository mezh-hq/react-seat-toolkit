import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import booths from "./booths";
import seats from "./seats";
import shapes from "./shapes";
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
  sections: [
    {
      id: uuidv4(),
      name: "Section 1"
    }
  ],
  selectedSection: null,
  selectedPolylineId: null,
  seats: {},
  booths: {},
  text: {},
  shapes: {},
  polylines: {},
  images: {}
};

initialState.selectedSection = initialState.sections[0].id;

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
    clearElements: (state, action) => {
      const keepLast = action.payload ?? false;
      if (!keepLast) {
        state.selectedElementIds = [];
      } else {
        state.selectedElementIds = [state.selectedElementIds[state.selectedElementIds.length - 1]];
      }
    },
    initializeElements: (state) => {
      state.seats[state.selectedSection] = seats();
      state.booths[state.selectedSection] = booths();
      state.text[state.selectedSection] = text();
      state.shapes[state.selectedSection] = shapes();
    },
    addSeat(state, action) {
      if (!state.seats[state.selectedSection]) {
        state.seats[state.selectedSection] = [];
      }
      state.seats[state.selectedSection].push(action.payload);
    },
    deleteSeat(state, action) {
      state.seats[state.selectedSection] = state.seats[state.selectedSection].filter(
        (seat) => seat.id !== action.payload
      );
    },
    addBooth(state, action) {
      if (!state.booths[state.selectedSection]) {
        state.booths[state.selectedSection] = [];
      }
      state.booths[state.selectedSection].push(action.payload);
    },
    deleteBooth(state, action) {
      state.booths[state.selectedSection] = state.booths[state.selectedSection].filter(
        (booth) => booth.id !== action.payload
      );
    },
    addText(state, action) {
      if (!state.text[state.selectedSection]) {
        state.text[state.selectedSection] = [];
      }
      state.text[state.selectedSection].push(action.payload);
    },
    deleteText(state, action) {
      state.text[state.selectedSection] = state.text[state.selectedSection].filter(
        (text) => text.id !== action.payload
      );
    },
    addShape(state, action) {
      if (!state.shapes[state.selectedSection]) {
        state.shapes[state.selectedSection] = [];
      }
      state.shapes[state.selectedSection].push(action.payload);
    },
    deleteShape(state, action) {
      state.shapes[state.selectedSection] = state.shapes[state.selectedSection].filter(
        (shape) => shape.id !== action.payload
      );
    },
    addPolyline: (state, action) => {
      if (!state.polylines[state.selectedSection]) {
        state.polylines[state.selectedSection] = [];
      }
      state.polylines[state.selectedSection].push(action.payload);
    },
    deletePolyline: (state, action) => {
      state.polylines[state.selectedSection] = state.polylines[state.selectedSection].filter(
        (polyline) => polyline.id !== action.payload
      );
    },
    addPolylinePoint: (state, action) => {
      const polyline = state.polylines[state.selectedSection].find((polyline) => polyline.id === action.payload.id);
      polyline.points.push(action.payload.point);
    },
    addImage: (state, action) => {
      if (!state.images[state.selectedSection]) {
        state.images[state.selectedSection] = [];
      }
      state.images[state.selectedSection].push(action.payload);
    },
    deleteImage: (state, action) => {
      state.images[state.selectedSection] = state.images[state.selectedSection].filter(
        (image) => image.id !== action.payload
      );
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      state.categories[index] = action.payload;
    },
    addSection: (state) => {
      state.sections.push({
        id: uuidv4(),
        name: `Section ${state.sections.length + 1}`
      });
    },
    deleteSection: (state, action) => {
      state.sections = state.sections.filter((section) => section.id !== action.payload);
      if (action.payload === state.selectedSection) {
        state.selectedSection = state.sections[0].id;
      }
      delete state.seats[action.payload];
      delete state.booths[action.payload];
      delete state.text[action.payload];
      delete state.shapes[action.payload];
      delete state.polylines[action.payload];
      delete state.images[action.payload];
    },
    selectSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    updateSection: (state, action) => {
      const index = state.sections.findIndex((section) => section.id === action.payload.id);
      state.sections[index] = action.payload;
    },
    setSelectedPolylineId: (state, action) => {
      state.selectedPolylineId = action.payload;
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
  deleteText,
  addShape,
  deleteShape,
  addPolyline,
  deletePolyline,
  addPolylinePoint,
  addImage,
  deleteImage,
  addCategory,
  deleteCategory,
  updateCategory,
  addSection,
  deleteSection,
  selectSection,
  updateSection,
  setSelectedPolylineId
} = slice.actions;

export default slice.reducer;
