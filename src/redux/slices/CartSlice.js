import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  activeSize: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setActiveSize(state, action) {
      state.activeSize = action.payload;
      console.log(state.activeSize);
    },

    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    setAddPizzas(state, action) {
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price[state.activeSize] * obj.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price[state.activeSize] * obj.count;
      }, 0);
    },
    setDeletePizzas(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price[state.activeSize] * obj.count;
      }, 0);
    },
    setClearPizzas(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  setAddPizzas,
  setTotalPrice,
  setDeletePizzas,
  setClearPizzas,
  minusItem,
  setActiveSize,
} = cartSlice.actions;

export default cartSlice.reducer;
