import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICharacter, ServerResponse } from '../../models/models';

export const fetchCharacters = createAsyncThunk(
  'users/fetchCharacter',
  async (sorting: { status: string; page: number; gender: string }) => {
    const { status, page, gender } = sorting;
    const { data } = await axios.get<ServerResponse<ICharacter>>(
      `https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&gender=${gender}`,
    );

    return data;
  },
);

interface CharacterState {
  loading: 'pending' | 'succeeded' | 'failed';
  error: string;
  count: number;
  characters: ICharacter[];
}

const initialState: CharacterState = {
  loading: 'pending',
  error: '',
  count: 0,
  characters: [],
};

const CharacterSlise = createSlice({
  name: 'setCharacters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCharacters.fulfilled,
      (state, action: PayloadAction<ServerResponse<ICharacter>>) => {
        state.loading = 'succeeded';
        state.characters = action.payload.results;
        state.count = action.payload.info.count;
      },
    );
    builder.addCase(fetchCharacters.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.loading = 'failed';
      state.error = 'err';
    });
  },
});

export default CharacterSlise.reducer;
