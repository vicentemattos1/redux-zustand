import { configureStore } from '@reduxjs/toolkit';
import { player } from './slices/player';

export const store = configureStore({
  reducer: { player },
});

export type RootState = ReturnType<typeof store.getState>;