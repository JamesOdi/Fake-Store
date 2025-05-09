// THIS FILE IS USED TO DEFINE THE SERVER ROUTES
// AND THE API ENDPOINTS

export const GET_ALL_CATEGORIES = {
  method: 'GET',
  path: 'products/categories',
};
export const GET_ALL_PRODUCTS = { method: 'GET', path: 'products' };
export const GET_ALL_PRODUCTS_BY_CATEGORY = {
  method: 'GET',
  path: 'products/category/:category',
};
export const GET_PRODUCT_BY_ID = { method: 'GET', path: 'products/:id' };
export const USER_SIGN_UP = { method: 'POST', path: 'users/signup' };
export const USER_SIGN_IN = { method: 'POST', path: 'users/signin' };
export const UPDATE_PROFILE = { method: 'POST', path: 'users/update' };
export const GET_CART_ITEMS = { method: 'GET', path: 'cart' };
export const UPDATE_CART_ITEMS = { method: 'PUT', path: 'cart' };
export const GET_USER_ORDERS = { method: 'GET', path: 'orders/all' };
export const CREATE_NEW_ORDER = { method: 'POST', path: 'orders/neworder' };
export const UPDATE_ORDER = { method: 'POST', path: 'orders/updateorder' };
