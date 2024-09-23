// src/reducers/mapReducer.ts
import { createSlice } from '@reduxjs/toolkit';

interface MapState {
  showOblasts: boolean;
  showRoads: boolean;
}

const initialState: MapState = {
  showOblasts: true,
  showRoads: true,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    toggleOblasts(state) {
      state.showOblasts = !state.showOblasts;
    },
    toggleRoads(state) {
      state.showRoads = !state.showRoads;
    },
  },
});

export const { toggleOblasts, toggleRoads } = mapSlice.actions;
export default mapSlice.reducer;
