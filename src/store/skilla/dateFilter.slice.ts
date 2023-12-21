import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { today, twoDaysAgo } from '../../utils/constants';

interface dateFilter {
  date_start: string;
  date_end: string;
  label: string;
}

const initialState: dateFilter = {
  date_start: twoDaysAgo,
  date_end: today,
  label: '3 дня',
};

export const dateFilterSlice = createSlice({
  name: 'dateFilter',
  initialState,
  reducers: {
    setDateFilter(state, action: PayloadAction<dateFilter>) {
      state.date_start = action.payload.date_start;
      state.date_end = action.payload.date_end;
      state.label = action.payload.label;
    },
  },
});

export const dateFilterActions = dateFilterSlice.actions;
export const dateFilterReducer = dateFilterSlice.reducer;
