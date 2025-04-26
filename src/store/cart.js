import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    // total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.items.some((item) => item.id === action.payload.id)) {
        return;
      }
      // payload: {id: string, count: number}
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cart.actions;
export default cart.reducer;
