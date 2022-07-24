import { configureStore } from '@reduxjs/toolkit';
import characters from './slises/CharacterSlise';

export const store = configureStore({
  reducer: {
    characters,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
