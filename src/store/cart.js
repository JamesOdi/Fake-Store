import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.items.some((item) => item.id === action.payload.id)) {
        return;
      }
      // payload: {id: string, count: number}
      state.items.push(action.payload);
    },
    incrementItemCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.count += 1;
      }
    },
    decrementItemCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
      }
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemCount,
  decrementItemCount,
} = cart.actions;
export default cart.reducer;
