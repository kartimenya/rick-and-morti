import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilters {
  page: number;
  status: string;
  gender: string;
}

const initialState: IFilters = {
  page: 1,
  status: '',
  gender: '',
};

const filterSlise = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<IFilters>) {
      state.page = action.payload.page;
      state.status = action.payload.status;
      state.gender = action.payload.gender;
    },
  },
});

export const { setFilters } = filterSlise.actions;

export default filterSlise.reducer;
