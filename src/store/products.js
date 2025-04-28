import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_ALL_PRODUCTS_BY_CATEGORY } from '../lib/routes';
import submitAndValidateThunk from '../lib/submit-and-validate';
import addExtraReducers from '../lib/addExtraReducers';

export const loadProductsData = createAsyncThunk(
  'loadProducts',
  async (category, thunkApi) => {
    if (!category) {
      return thunkApi.rejectWithValue('Category is required');
    }
    return await submitAndValidateThunk(thunkApi, {
      route: GET_ALL_PRODUCTS_BY_CATEGORY,
      routeParams: { category },
    });
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addExtraReducers(builder, loadProductsData, initialState, 'products');
  },
});

export const getProducts = (state) => state.products;
export default productsSlice.reducer;
