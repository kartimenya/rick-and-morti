import { configureStore } from '@reduxjs/toolkit';
import characters from './slises/CharacterSlise';
import filter from './slises/FilterSlise';
import bookmark from './slises/BookmarkSlise';

export const store = configureStore({
  reducer: {
    bookmark,
    characters,
    filter,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
