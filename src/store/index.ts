import { configureStore } from '@reduxjs/toolkit';

import checkboxReducer from './checkBoxSlice';
import ticketsSlice from './ticketsSlice';

export const store = configureStore({
  reducer: {
    checkbox: checkboxReducer,
    tickets: ticketsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
