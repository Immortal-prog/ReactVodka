import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/CartSlice';
import responce from './slices/responceSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    responce,
  },
});
