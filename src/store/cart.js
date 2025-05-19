import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../lib/format-number';
import submitAndValidateThunk from '../lib/submit-and-validate';
import {
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  UPDATE_CART_ITEMS,
} from '../lib/routes';
import addExtraReducers from '../lib/addExtraReducers';
import { statusOk } from '../lib/api-request';

export const loadCart = createAsyncThunk('loadCart', async (_, thunkApi) => {
  const productsResponse = await submitAndValidateThunk(thunkApi, {
    route: GET_ALL_PRODUCTS,
  });
  if (Array.isArray(productsResponse)) {
    const cartItemsResponse = await submitAndValidateThunk(thunkApi, {
      route: GET_CART_ITEMS,
    });
    if ('items' in cartItemsResponse) {
      const result = cartItemsResponse.items.map(({ id, count }) => {
        const product = productsResponse.find((product) => product.id == id);
        if (product) {
          return {
            product,
            count,
          };
        }
        return {
          product: undefined,
          count,
        };
      });
      return result;
    }
    return cartItemsResponse;
  }
  return productsResponse;
});

export const addCartItem = createAsyncThunk(
  'addToCart',
  async (product, thunkApi) => {
    const cartItemsResponse = await submitAndValidateThunk(thunkApi, {
      route: GET_CART_ITEMS,
    });
    let cartItems = [];
    if (statusOk(cartItemsResponse) && 'items' in cartItemsResponse) {
      cartItems = cartItemsResponse.items;
    }

    let count = 1;

    const itemFound = cartItems.find((item) => item.id == product.id);
    if (itemFound) {
      itemFound.count++;
      count = itemFound.count;
    } else {
      cartItems.push({
        id: product.id,
        price: product.price,
        count: 1,
      });
    }

    await submitAndValidateThunk(thunkApi, {
      route: UPDATE_CART_ITEMS,
      bodyParams: {
        items: cartItems,
      },
    });

    return {
      product,
      count,
    };
  }
);

export const decrementOrRemoveCartItem = createAsyncThunk(
  'decrementOrRemoveCartItem',
  async (args, thunkApi) => {
    const cartItemsResponse = await submitAndValidateThunk(thunkApi, {
      route: GET_CART_ITEMS,
    });

    let cartItems = [];
    if (statusOk(cartItemsResponse) && 'items' in cartItemsResponse) {
      cartItems = cartItemsResponse.items;
    }

    let count = 0;
    if ('action' in args && args.action == 'remove') {
      const index = cartItems.findIndex((item) => item.id === args.id);
      if (index !== -1) {
        cartItems.splice(index, 1);
      }
    } else {
      const itemFound = cartItems.find((item) => item.id == args.id);
      if (itemFound.count > 1) {
        itemFound.count--;
        count = itemFound.count;
      } else {
        const index = cartItems.findIndex((item) => item.id === args.id);
        if (index !== -1) {
          cartItems.splice(index, 1);
        }
      }
    }

    await submitAndValidateThunk(thunkApi, {
      route: UPDATE_CART_ITEMS,
      bodyParams: {
        items: cartItems,
      },
    });

    return {
      id: args.id,
      count,
    };
  }
);

export const clearCart = createAsyncThunk('clearCart', async (_, thunkApi) => {
  const response = await submitAndValidateThunk(thunkApi, {
    route: UPDATE_CART_ITEMS,
    bodyParams: {
      items: [],
    },
  });

  if (statusOk(response)) {
    return [];
  } else {
    return response;
  }
});

const initialState = {
  cartData: [],
  isLoading: false,
  isComponentLoading: false,
  error: null,
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addExtraReducers({
      builder,
      thunk: loadCart,
      initialState,
      responseKey: 'cartData',
    });
    addExtraReducers({
      builder,
      thunk: addCartItem,
      initialState,
      responseKey: 'cartData',
      useComponentLoading: true,
      formatFulfilledResponse: (response, state) => {
        const itemFound = state.cartData.find(
          ({ product }) => response.product.id == product.id
        );
        if (itemFound) {
          itemFound.count = response.count;
          return state.cartData;
        }
        state.cartData.push(response);
        return state.cartData;
      },
    });
    addExtraReducers({
      builder,
      thunk: decrementOrRemoveCartItem,
      initialState,
      responseKey: 'cartData',
      useComponentLoading: true,
      formatFulfilledResponse: (response, state) => {
        const itemFound = state.cartData.find(
          ({ product }) => response.id == product.id
        );
        if (itemFound) {
          if (response.count > 0) {
            itemFound.count = response.count;
          } else {
            const index = state.cartData.findIndex(
              ({ product }) => response.id == product.id
            );
            if (index !== -1) {
              state.cartData.splice(index, 1);
            }
          }
        }
        return state.cartData;
      },
    });
    addExtraReducers({
      builder,
      thunk: clearCart,
      initialState,
      responseKey: 'cartData',
      useComponentLoading: true,
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemCount,
  decrementItemCount,
} = cart.actions;

export const getCart = (state) => state.cart;
export default cart.reducer;
