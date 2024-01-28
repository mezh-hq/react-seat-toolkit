import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    selectElement: (state, action) => {
      state.selectedElement = action.payload;
    }
  }
});

export const { selectElement } = slice.actions;

export default slice.reducer;
