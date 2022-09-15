import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/CartSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
  },
});
