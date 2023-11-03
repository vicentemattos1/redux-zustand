import { configureStore } from '@reduxjs/toolkit';
import { player } from './slices/player';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { player },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
