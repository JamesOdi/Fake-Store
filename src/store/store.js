import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import categoriesReducer from './categories';
import productReducer from './product';
import productsReducer from './products';
import profileReducer from './profile';
import ordersReducer from './orders';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
    user: profileReducer,
    orders: ordersReducer,
  },
});

export default store;
