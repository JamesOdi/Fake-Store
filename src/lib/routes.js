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
