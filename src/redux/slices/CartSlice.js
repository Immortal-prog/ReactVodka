import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    // setAddItems(state, action) {
    //   state.items.push(action.payload);

    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return sum + obj.price;
    //   }, 0);
    // },
    setAddItems(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.size === action.payload.size && obj.type === action.payload.type;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    setMinusItem(state, action) {},
  },
});

export const { setAddItems } = cartSlice.actions;

export default cartSlice.reducer;
