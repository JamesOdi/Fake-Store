import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_PRODUCT_BY_ID } from '../lib/routes';
import submitAndValidateThunk from '../lib/submit-and-validate';
import addExtraReducers from '../lib/addExtraReducers';

export const loadProductData = createAsyncThunk(
  'loadProduct',
  async (productId, thunkApi) => {
    if (!productId) {
      return thunkApi.rejectWithValue('Product id is required');
    }
    return await submitAndValidateThunk(thunkApi, {
      route: GET_PRODUCT_BY_ID,
      routeParams: { id: productId },
    });
  }
);

const initialState = {
  product: {},
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    addExtraReducers(builder, loadProductData, initialState, 'product');
  },
});

export const getProduct = (state) => state.product;
export default productSlice.reducer;
