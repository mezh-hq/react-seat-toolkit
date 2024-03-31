import { Reducer, createSelector, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { ISTKData } from "@/types";
import booths from "./booths";
import seats from "./seats";
import shapes from "./shapes";
import text from "./text";

export const locationPlaceholder = "Type your location here";

const noSection = {
  id: "0",
  name: "No Section",
  color: "#ffffff",
  stroke: "#ffffff"
};

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
    noSection,
    {
      id: uuidv4(),
      name: "Section 1",
      color: "#000000",
      stroke: "#000000",
      freeSeating: true
    },
    {
      id: uuidv4(),
      name: "Section 2",
      color: "#FF0000",
      stroke: "#FF0000",
      freeSeating: false
    },
    {
      id: uuidv4(),
      name: "Section 3",
      color: "#0000FF",
      stroke: "#0000FF",
      freeSeating: false
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
    updateSeats(state, action) {
      state.seats = state.seats.map((seat) =>
        action.payload.ids.includes(seat.id) ? { ...seat, ...action.payload.data } : seat
      );
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
    updatePolyline(state, action) {
      const index = state.polylines.findIndex((polyline) => polyline.id === action.payload.id);
      state.polylines[index] = { ...state.polylines[index], ...action.payload };
    },
    updatePolylines(state, action) {
      state.polylines = state.polylines.map((polyline) =>
        action.payload.ids.includes(polyline.id) ? { ...polyline, ...action.payload.data } : polyline
      );
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
        color: "#000000",
        textColor: "#f7f7f7"
      };
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      state.categories[index] = { ...state.categories[index], ...action.payload };
    },
    addSection: (state) => {
      state.sections.push({
        id: uuidv4(),
        name: `Section ${state.sections.length + 1}`,
        color: "#000000",
        stroke: "#000000",
        freeSeating: false
      });
    },
    updateSection: (state, action) => {
      const index = state.sections.findIndex((section) => section.id === action.payload.id);
      state.sections[index] = { ...state.sections[index], ...action.payload };
    },
    deleteSection: (state, action) => {
      state.sections = state.sections.filter((section) => section.id !== action.payload);
    },
    setSelectedPolylineId: (state, action) => {
      state.selectedPolylineId = action.payload;
    },
    sync: (state, action) => {
      const { name, sections, ...data } = action.payload as ISTKData;
      state.location = name ?? state.location;
      state.sections = sections ? [noSection, ...sections] : state.sections;
      Object.keys(data).forEach((key) => {
        state[key] = data[key] ?? state[key];
      });
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
  updateSeats,
  addBooth,
  deleteBooth,
  addText,
  deleteText,
  addShape,
  deleteShape,
  addPolyline,
  updatePolyline,
  updatePolylines,
  deletePolyline,
  addPolylinePoint,
  addImage,
  deleteImage,
  addCategory,
  deleteCategory,
  updateCategory,
  addSection,
  updateSection,
  deleteSection,
  setSelectedPolylineId,
  sync
} = slice.actions;

export const selectPolylineById = (id: string) =>
  createSelector(
    (state: any) => state.editor.polylines,
    (polylines) => polylines.find((polyline) => polyline.id === id)
  );

export default slice.reducer as Reducer<typeof initialState>;
