import { configureStore } from '@reduxjs/toolkit';
import { api } from './skilla/skilla.api';
import { skillaReducer } from './skilla/skilla.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    skilla: skillaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
