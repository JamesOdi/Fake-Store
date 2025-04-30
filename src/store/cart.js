import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../lib/format-number';

const initialState = {
  cartData: [],
  totalPrice: '',
  totalNumOfItems: 0,
  isLoading: false,
  error: null,
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (
        state.cartData.some(
          (item) => item.product.id === action.payload.product.id
        )
      ) {
        return;
      }
      // payload: { product: Product, count: number }
      state.cartData.push(action.payload);
      updateCartState(state);
    },
    incrementItemCount: (state, action) => {
      const item = state.cartData.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        item.count += 1;
      }
      updateCartState(state);
    },
    decrementItemCount: (state, action) => {
      const item = state.cartData.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          const index = state.cartData.findIndex(
            (item) => item.product.id === action.payload.product.id
          );
          if (index !== -1) {
            state.cartData.splice(index, 1);
          }
        }
      }
      updateCartState(state);
    },
    removeFromCart: (state, action) => {
      const index = state.cartData.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (index !== -1) {
        state.cartData.splice(index, 1);
      }
      updateCartState(state);
    },
  },
});

function updateCartState(state) {
  state.totalPrice = formatCurrency(
    state.cartData.reduce((acc, item) => {
      return acc + item.product.price * item.count;
    }, 0)
  );

  state.totalNumOfItems = state.cartData.reduce(
    (acc, item) => acc + item.count,
    0
  );
}

export const {
  addToCart,
  removeFromCart,
  incrementItemCount,
  decrementItemCount,
} = cart.actions;

export const getCart = (state) => state.cart;
export default cart.reducer;
