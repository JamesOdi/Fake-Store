import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import submitAndValidateThunk from '../lib/submit-and-validate';
import { USER_SIGN_IN, USER_SIGN_UP } from '../lib/routes';
import addExtraReducers from '../lib/addExtraReducers';

export const signInUser = createAsyncThunk(
  'signIn',
  async (bodyParams, thunkApi) => {
    if (!bodyParams.email || !bodyParams.password) {
      return thunkApi.rejectWithValue(
        `Your ${!bodyParams.email ? 'email' : 'password'} is required!`
      );
    }
    return await submitAndValidateThunk(thunkApi, {
      route: USER_SIGN_IN,
      bodyParams,
    });
  }
);

export const signUpUser = createAsyncThunk(
  'signUp',
  async (bodyParams, thunkApi) => {
    if (!bodyParams.name || !bodyParams.email || !bodyParams.password) {
      const errorMessage = `Your ${
        !bodyParams.name ? 'username' : !bodyParams.email ? 'email' : 'password'
      } is required!`;
      return thunkApi.rejectWithValue(errorMessage);
    }
    return await submitAndValidateThunk(thunkApi, {
      route: USER_SIGN_UP,
      bodyParams,
    });
  }
);

export const updateUserProfile = createAsyncThunk(
  'updateProfile',
  async (bodyParams, thunkApi) => {
    if (!bodyParams.name || !bodyParams.password) {
      const errorMessage = `Your ${
        !bodyParams.name ? 'username' : 'password'
      } is required!`;
      return thunkApi.rejectWithValue(errorMessage);
    }
    return await submitAndValidateThunk(thunkApi, {
      route: USER_SIGN_UP,
      bodyParams,
    });
  }
);

const thunkApiList = [signInUser, signUpUser, updateUserProfile];

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    thunkApiList.map((thunkApi) => {
      addExtraReducers(builder, thunkApi, initialState, 'user');
    });
  },
});

export const { signOutUser } = userSlice.actions;
export const getUser = (state) => state.user;
export default userSlice.reducer;
