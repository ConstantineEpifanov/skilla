import { configureStore } from '@reduxjs/toolkit';
import { api } from './skilla/skilla.api';
import { skillaReducer } from './skilla/skilla.slice';
import { dateFilterReducer } from './skilla/dateFilter.slice';
import { callFilterReducer } from './skilla/callFilter.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    skilla: skillaReducer,
    dateFilter: dateFilterReducer,
    callFilter: callFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
