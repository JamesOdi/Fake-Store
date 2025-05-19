import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import submitAndValidateThunk from '../lib/submit-and-validate';
import { UPDATE_PROFILE, USER_SIGN_IN, USER_SIGN_UP } from '../lib/routes';
import addExtraReducers from '../lib/addExtraReducers';

export const signInUser = createAsyncThunk(
  'signIn',
  async (bodyParams, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: USER_SIGN_IN,
      bodyParams,
    });
  }
);

export const signUpUser = createAsyncThunk(
  'signUp',
  async (bodyParams, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: USER_SIGN_UP,
      bodyParams,
    });
  }
);

export const updateUserProfile = createAsyncThunk(
  'updateProfile',
  async (bodyParams, thunkApi) => {
    return await submitAndValidateThunk(thunkApi, {
      route: UPDATE_PROFILE,
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
    refreshUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    thunkApiList.map((thunkApi) => {
      addExtraReducers({
        builder,
        thunk: thunkApi,
        initialState,
        responseKey: 'user',
        useComponentLoading: true,
        formatFulfilledResponse: (response, state) => {
          if (thunkApi.typePrefix == 'updateProfile') {
            return {
              ...state.user,
              name: response.name,
            };
          } else {
            return response;
          }
        },
      });
    });
  },
});

export const { signOutUser, refreshUserProfile } = userSlice.actions;
export const getUser = (state) => state.user;
export default userSlice.reducer;
