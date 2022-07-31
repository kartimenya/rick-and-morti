import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from './../../models/models';

interface BookmarkState {
  bookmarkCharacter: ICharacter[];
}

const initialState: BookmarkState = {
  bookmarkCharacter: [],
};

const bookmarkSlise = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarkItem(state, action: PayloadAction<ICharacter>) {
      const findItem = state.bookmarkCharacter.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        state.bookmarkCharacter = state.bookmarkCharacter.filter(
          (item) => item.id != action.payload.id,
        );
      } else {
        state.bookmarkCharacter.push(action.payload);
      }
    },
  },
});

export const { setBookmarkItem } = bookmarkSlise.actions;

export default bookmarkSlise.reducer;
