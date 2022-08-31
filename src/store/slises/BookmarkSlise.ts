import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from './../../models/models';

interface BookmarkState {
  bookmarkCharacters: ICharacter[];
}

const initialState: BookmarkState = {
  bookmarkCharacters: [],
};

const bookmarkSlise = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarkItem(state, action: PayloadAction<ICharacter>) {
      const findItem = state.bookmarkCharacters.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        state.bookmarkCharacters = state.bookmarkCharacters.filter(
          (item) => item.id != action.payload.id,
        );
      } else {
        state.bookmarkCharacters.push(action.payload);
      }
    },
  },
});

export const { setBookmarkItem } = bookmarkSlise.actions;

export default bookmarkSlise.reducer;
