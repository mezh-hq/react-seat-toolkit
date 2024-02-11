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
  categories: [
    {
      id: uuidv4(),
      name: "Standard",
      color: "#000000",
      textColor: "#f7f7f7"
    },
    {
      id: uuidv4(),
      name: "Premium",
      color: "#FF0000",
      textColor: "#f7f7f7"
    },
    {
      id: uuidv4(),
      name: "VIP",
      color: "#0000FF",
      textColor: "#f7f7f7"
    }
  ],
  sections: [
    {
      id: uuidv4(),
      name: "Section 1"
    }
  ],
  selectedPolylineId: null,
  seats: [],
  booths: [],
  text: [],
  shapes: [],
  polylines: [],
  images: []
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
    clearAndSelectElements: (state, action) => {
      state.selectedElementIds = action.payload;
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
      state.seats = seats();
      state.booths = booths();
      state.text = text();
      state.shapes = shapes();
    },
    addSeat(state, action) {
      state.seats.push(action.payload);
    },
    deleteSeat(state, action) {
      state.seats = state.seats.filter((seat) => seat.id !== action.payload);
    },
    updateSeat(state, action) {
      const index = state.seats.findIndex((seat) => seat.id === action.payload.id);
      state.seats[index] = { ...state.seats[index], ...action.payload };
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
    },
    addShape(state, action) {
      state.shapes.push(action.payload);
    },
    deleteShape(state, action) {
      state.shapes = state.shapes.filter((shape) => shape.id !== action.payload);
    },
    addPolyline: (state, action) => {
      state.polylines.push(action.payload);
    },
    deletePolyline: (state, action) => {
      state.polylines = state.polylines.filter((polyline) => polyline.id !== action.payload);
    },
    addPolylinePoint: (state, action) => {
      const polyline = state.polylines.find((polyline) => polyline.id === action.payload.id);
      polyline.points.push(action.payload.point);
    },
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    deleteImage: (state, action) => {
      state.images = state.images.filter((image) => image.id !== action.payload);
    },
    addCategory: (state, action) => {
      action.payload ??= {
        id: uuidv4(),
        name: "New Category",
        color: "#000000"
      };
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
  clearAndSelectElements,
  initializeElements,
  addSeat,
  deleteSeat,
  updateSeat,
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
  updateSection,
  setSelectedPolylineId
} = slice.actions;

export default slice.reducer;
