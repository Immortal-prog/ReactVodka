import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setAddItems(state, action) {
      const findItmes = state.items.find((obj) => obj.id === action.payload.id);
      console.log(findItmes);
    },
  },
});

export default cartSlice.reducer;
