import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableItem } from '../../models/models';

interface skillaState {
  list: TableItem[];
}

const initialState: skillaState = {
  list: [],
};

export const skillaSlice = createSlice({
  name: 'skilla',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<TableItem[]>) {
      state.list = action.payload;
    },
  },
});

export const skillaActions = skillaSlice.actions;
export const skillaReducer = skillaSlice.reducer;
