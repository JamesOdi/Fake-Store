import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import submitAndValidateThunk from '../lib/submit-and-validate';
import {
  CREATE_NEW_ORDER,
  GET_ALL_PRODUCTS,
  GET_USER_ORDERS,
  UPDATE_ORDER,
} from '../lib/routes';
import addExtraReducers from '../lib/addExtraReducers';
import { clearCart } from './cart';

export const loadOrders = createAsyncThunk(
  'loadOrders',
  async (_, thunkApi) => {
    const productsResponse = await submitAndValidateThunk(thunkApi, {
      route: GET_ALL_PRODUCTS,
    });

    if (Array.isArray(productsResponse)) {
      const ordersResponse = await submitAndValidateThunk(thunkApi, {
        route: GET_USER_ORDERS,
      });

      if ('status' in ordersResponse && ordersResponse.status === 'OK') {
        const result = ordersResponse.orders.map((order) => {
          const parsedOrderItems = JSON.parse(order.order_items);
          // "[{\"prodID\":1,\"price\":3.5,\"quantity\":2}]"
          const orderItems = parsedOrderItems.map(
            ({ prodID, price, quantity }) => {
              const product = productsResponse.find(({ id }) => id == prodID);
              if (product) {
                return {
                  product,
                  price,
                  quantity,
                };
              } else {
                return {
                  product: undefined,
                  price: 0,
                  quantity: 0,
                };
              }
            }
          );
          return {
            ...order,
            is_paid: order.is_paid == 1,
            is_delivered: order.is_delivered == 1,
            order_items: orderItems,
          };
        });
        return result;
      }
      return ordersResponse;
    }
    return productsResponse;
  }
);

export const createNewOrder = createAsyncThunk(
  'createNewOrder',
  async (cartData, thunkApi) => {
    const ordersResponse = await submitAndValidateThunk(thunkApi, {
      route: GET_USER_ORDERS,
    });

    if ('status' in ordersResponse && ordersResponse.status === 'OK') {
      const items = cartData.map((data) => {
        return {
          prodID: data.product.id,
          price: data.product.price,
          quantity: data.count,
        };
      });

      const createNewOrderResponse = await submitAndValidateThunk(thunkApi, {
        route: CREATE_NEW_ORDER,
        bodyParams: {
          items,
        },
      });

      if (
        'status' in createNewOrderResponse &&
        createNewOrderResponse.status == 'OK'
      ) {
        await thunkApi.dispatch(clearCart());
        const response = await thunkApi.dispatch(loadOrders());
        if (response.type.endsWith('fulfilled')) {
          return response.payload;
        } else {
          return thunkApi.rejectWithValue('Error loading orders');
        }
      }
      return createNewOrderResponse;
    }
    return ordersResponse;
  }
);

export const payOrder = createAsyncThunk(
  'payOrder',
  async (orderId, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: UPDATE_ORDER,
      bodyParams: {
        orderID: orderId,
        isPaid: 1,
        isDelivered: 0,
      },
    });
  }
);

export const deliverOrder = createAsyncThunk(
  'deliverOrder',
  async (orderId, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: UPDATE_ORDER,
      bodyParams: {
        orderID: orderId,
        isPaid: 1,
        isDelivered: 1,
      },
    });
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  isComponentLoading: false,
  error: null,
};

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addExtraReducers({
      builder,
      thunk: loadOrders,
      initialState,
      responseKey: 'orders',
    });
    addExtraReducers({
      builder,
      thunk: createNewOrder,
      initialState,
      responseKey: 'orders',
      useComponentLoading: true,
    });
    addExtraReducers({
      builder,
      thunk: payOrder,
      initialState,
      responseKey: 'orders',
      useComponentLoading: true,
      formatFulfilledResponse: (response, state) => {
        if (response.result.changes > 0) {
          const order = state.orders.find(
            ({ id }) => id == response.result.lastID
          );
          if (order) {
            order.is_paid = true;
            order.is_delivered = false;
          }
        }
        return state.orders;
      },
    });
    addExtraReducers({
      builder,
      thunk: deliverOrder,
      initialState,
      responseKey: 'orders',
      useComponentLoading: true,
      formatFulfilledResponse: (response, state) => {
        if (response.result.changes > 0) {
          const order = state.orders.find(
            ({ id }) => id == response.result.lastID
          );
          if (order) {
            order.is_paid = true;
            order.is_delivered = true;
          }
        }
        return state.orders;
      },
    });
  },
});

export const getOrders = (state) => state.orders;
export default orders.reducer;
