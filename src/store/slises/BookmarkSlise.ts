import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarkState {
  idArr: number[];
}

const initialState: BookmarkState = {
  idArr: [],
};

const bookmarkSlise = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarkItem(state, action: PayloadAction<number>) {
      state.idArr.push(action.payload);
    },
  },
});

export const { setBookmarkItem } = bookmarkSlise.actions;

export default bookmarkSlise.reducer;
