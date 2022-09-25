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
      const findItem = state.items.find((obj) => {
        return (
          obj.size === action.payload.size &&
          obj.type === action.payload.type &&
          obj.id === action.payload.id
        );
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
    setPlusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.size === action.payload.size &&
          obj.type === action.payload.type &&
          obj.id === action.payload.id
        );
      });

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    setMinusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.size === action.payload.size &&
          obj.type === action.payload.type &&
          obj.id === action.payload.id
        );
      });

      findItem && findItem.count--;

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    setRemoveItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter((obj) => {
        return (
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
        );
      });
    },
    setDeleteItemCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { setAddItems, setMinusItem, setPlusItem, setRemoveItem, setDeleteItemCart } =
  cartSlice.actions;

export default cartSlice.reducer;
