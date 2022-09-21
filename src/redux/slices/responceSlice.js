import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosItems = createAsyncThunk('alcohol/fetchItemsStatus', async (params) => {
  const { order, search, category, sort, currentPage } = params;
  const res = await axios.get(
    `https://62dd5df1ccdf9f7ec2c5f699.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProp.replace(
      '-',
      '',
    )}&order=${order}${search}`,
  );
  return res.data;
});

const initialState = {
  alcoholItems: [],
  status: '', // loading, success, error
};

const alcoholItems = createSlice({
  name: 'alcoholItems',
  initialState,
  reducers: {
    setAlcoholItems(state, action) {
      state.alcoholItems = action.payload;
    },
  },
  extraReducers: {
    [axiosItems.pending]: (state) => {
      state.status = 'loading';
      state.alcoholItems = [];
    },
    [axiosItems.fulfilled]: (state) => {
      state.status = 'success';
    },
    [axiosItems.rejected]: (state) => {
      state.status = 'error';
      state.alcoholItems = [];
    },
  },
});

export const { setAlcoholItems } = alcoholItems.actions;

export default alcoholItems.reducer;
