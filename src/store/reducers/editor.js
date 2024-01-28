import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "Type your location here",
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
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    selectElement: (state, action) => {
      state.selectedElement = action.payload;
    }
  }
});

export const { setLocation, selectElement } = slice.actions;

export default slice.reducer;
