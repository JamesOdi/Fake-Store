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
import { showErrorAlertDialog, statusOk } from '../lib/api-request';
import { formatCurrency } from '../lib/format-number';

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

      if (statusOk(ordersResponse)) {
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

    if (statusOk(ordersResponse)) {
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

      if (statusOk(createNewOrderResponse)) {
        const response = await thunkApi.dispatch(loadOrders());
        if (response.type.endsWith('fulfilled')) {
          await thunkApi.dispatch(clearCart());
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
    const response = await submitAndValidateThunk(thunkApi, {
      route: UPDATE_ORDER,
      bodyParams: {
        orderID: orderId,
        isPaid: 1,
        isDelivered: 0,
      },
    });

    if ('status' in response && response.status == 'OK') {
      return {
        result: {
          orderId,
        },
      };
    }
    return response;
  }
);

export const deliverOrder = createAsyncThunk(
  'deliverOrder',
  async (orderId, thunkApi) => {
    const response = await submitAndValidateThunk(thunkApi, {
      route: UPDATE_ORDER,
      bodyParams: {
        orderID: orderId,
        isPaid: 1,
        isDelivered: 1,
      },
    });

    if (statusOk(response)) {
      return {
        result: {
          orderId,
        },
      };
    }
    return response;
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
      formatFulfilledResponse: (response) => {
        showErrorAlertDialog({
          title: 'Order Placed Successfully',
          message:
            'Thank you for your purchase! Your order has been placed and your cart has been cleared. You can continue shopping and add more items to your cart.',
        });
        return response;
      },
    });
    addExtraReducers({
      builder,
      thunk: payOrder,
      initialState,
      responseKey: 'orders',
      useComponentLoading: true,
      formatFulfilledResponse: (response, state) => {
        const order = state.orders.find(
          ({ id }) => id == response.result.orderId
        );
        if (order) {
          order.is_paid = true;
          order.is_delivered = false;
        }
        showErrorAlertDialog({
          title: 'Payment Successful',
          message: `Thank you for your payment! Your order has been marked as paid. Total amount: ${formatCurrency(
            order.total_price / 100
          )}.`,
        });
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
        const order = state.orders.find(
          ({ id }) => id == response.result.orderId
        );
        if (order) {
          order.is_paid = true;
          order.is_delivered = true;
        }
        showErrorAlertDialog({
          title: 'Order Delivered',
          message: `Your order has been successfully delivered! Total amount paid: ${formatCurrency(
            order.total_price / 100
          )}. Number of items: ${
            order.item_numbers
          }. Thank you for shopping with us!`,
        });
        return state.orders;
      },
    });
  },
});

export const getOrders = (state) => state.orders;
export default orders.reducer;
