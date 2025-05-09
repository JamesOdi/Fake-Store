import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET_ALL_CATEGORIES } from '../lib/routes';
import { capitalizeFirstLetterOfEachWord } from '../lib/utils';
import submitAndValidateThunk from '../lib/submit-and-validate';
import addExtraReducers from '../lib/addExtraReducers';

export const loadCategoriesData = createAsyncThunk(
  'loadCategories',
  async (_, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: GET_ALL_CATEGORIES,
    });
  }
);

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addExtraReducers({
      builder,
      thunk: loadCategoriesData,
      initialState,
      responseKey: 'categories',
      // format the response to an array of objects with name and label properties
      formatFulfilledResponse: (response) => {
        return response.map((item) => ({
          name: item,
          // capitalize first letter of each word
          label: capitalizeFirstLetterOfEachWord(item),
        }));
      },
    });
  },
});

export const getCategories = (state) => state.categories;
export default categoriesSlice.reducer;
