import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface callFilter {
  id: string;
  label: string;
}

const initialState: callFilter = {
  id: 'all',
  label: 'Все типы',
};

export const callFilterSlice = createSlice({
  name: 'callFilter',
  initialState,
  reducers: {
    setCallFilter(state, action: PayloadAction<callFilter>) {
      state.id = action.payload.id;
      state.label = action.payload.label;
    },
  },
});

export const callFilterActions = callFilterSlice.actions;
export const callFilterReducer = callFilterSlice.reducer;
