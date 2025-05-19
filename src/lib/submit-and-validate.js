import { apiRequest, statusOk } from './api-request';

export default async function submitAndValidateThunk(
  thunkApi,
  { route, routeParams, bodyParams }
) {
  if (!route) {
    return thunkApi.rejectWithValue('Route is required');
  }
  try {
    const response = await apiRequest({ route, routeParams, bodyParams });
    if (statusOk(response)) {
      const data = response.body;
      if ('status' in data && data.status == 'error') {
        if (data.message == 'Wrong token.') {
          // Notify the thunkApi to logout the user
          thunkApi.dispatch({ type: 'user/signOutUser' });
        }
        return thunkApi.rejectWithValue(data.message);
      }
      return data;
    }
    return thunkApi.rejectWithValue(response.body);
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
}
