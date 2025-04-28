import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import submitAndValidateThunk from '../lib/submit-and-validate';
import { GET_ALL_PRODUCTS } from '../lib/routes';
import addExtraReducers from '../lib/addExtraReducers';
import { formatCurrency } from '../lib/format-number';

export const loadCartData = createAsyncThunk(
  'loadCart',
  async (_, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: GET_ALL_PRODUCTS,
    });
  }
);

const initialState = {
  products: [],
  items: [],
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
      if (state.items.some((item) => item.id === action.payload.id)) {
        return;
      }
      // payload: {id: string, count: number}
      state.items.push(action.payload);
      updateCartState(state, state.products);
    },
    incrementItemCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.count += 1;
      }
      updateCartState(state, state.products);
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
      updateCartState(state, state.products);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      updateCartState(state, state.products);
    },
  },
  extraReducers: (builder) => {
    addExtraReducers(
      builder,
      loadCartData,
      initialState,
      'cartData',
      (response, state) => {
        return updateCartState(state, response, true);
      }
    );
  },
});

function updateCartState(state, products, loadingProducts = false) {
  state.totalPrice = formatCurrency(
    products.reduce((acc, product) => {
      const cartItem = state.items.find((item) => item.id === product.id);
      if (cartItem) {
        return acc + product.price * cartItem.count;
      }
      return acc;
    }, 0)
  );

  state.totalNumOfItems = state.items.reduce(
    (acc, item) => acc + item.count,
    0
  );

  const cartItemsData = [];
  products.forEach((product) => {
    const cartItem = state.items.find((item) => item.id === product.id);
    if (cartItem) {
      cartItemsData.push({
        ...product,
        count: cartItem.count,
      });
    }
  });

  if (loadingProducts) {
    state.products = products;
  } else {
    state.cartData = cartItemsData;
  }
  return cartItemsData;
}

export const {
  addToCart,
  removeFromCart,
  incrementItemCount,
  decrementItemCount,
} = cart.actions;

export const getCart = (state) => state.cart;
export default cart.reducer;
