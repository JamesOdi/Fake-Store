import { fetch } from 'expo/fetch';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_NEW_ORDER, USER_SIGN_IN, USER_SIGN_UP } from './routes';

const ASYNC_STORAGE_TOKEN_KEY = 'token';

export async function apiRequest({ route, routeParams, bodyParams }) {
  // see: https://docs.expo.dev/guides/environment-variables/
  // It defines how expo environment variables are defined
  const BASE_URL =
    process.env.EXPO_PUBLIC_SERVER_BASE_URL || 'http://localhost:3000/';

  const method = route.method;
  let path = route.path;

  if (routeParams) {
    const routeKeys = Object.keys(routeParams);
    routeKeys.forEach((key) => {
      path = path.replace(`:${key}`, routeParams[key]);
    });
  }

  const url = BASE_URL + path;
  let bodyStr = JSON.stringify(bodyParams);

  if (method == 'GET' || method == 'DELETE') {
    bodyStr = undefined;
  }

  const token = await getAuthorizationCookie();

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Accept-Charset', 'utf-8');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const result = await fetch(url, {
      headers,
      method,
      body: bodyStr,
    });
    const js = await result.json();
    if (js.error) {
      let errorMessage = '';
      switch (js.error) {
        case 'nodata':
          errorMessage = 'No response data found for this request';
          showErrorAlertDialog({
            title: 'No Data Found',
            message: errorMessage,
          });
          break;
      }
      throw new Error(errorMessage);
    }

    if (route.path == USER_SIGN_UP.path || route.path == USER_SIGN_IN.path) {
      if ('token' in js) {
        // Save the authorization cookie if it exists in the response
        await saveAuthorizationCookie(js.token);
      }
    }

    if (route.path == CREATE_NEW_ORDER.path) {
      console.log('NEW ORDER', JSON.stringify(js, null, 2));
    }

    return {
      body: js,
      status: result.status,
      headers: result.headers,
    };
  } catch (error) {
    return {
      status: 500,
      body: error.message,
      headers,
    };
  }
}

export function statusOk(status) {
  if (typeof status == 'object' && 'status' in status) {
    return status.status >= 200 && status.status < 300;
  } else if (typeof status == 'number') {
    return status >= 200 && status < 300;
  } else {
    return false;
  }
}

export function showErrorAlertDialog({ title, message, buttons }) {
  Alert.alert(title, message, buttons);
}

export async function saveAuthorizationCookie(cookie) {
  try {
    await AsyncStorage.setItem(ASYNC_STORAGE_TOKEN_KEY, cookie);
  } catch (e) {
    throw e;
  }
}

export async function getAuthorizationCookie() {
  try {
    const cookie = await AsyncStorage.getItem(ASYNC_STORAGE_TOKEN_KEY);
    return cookie || '';
  } catch (e) {
    throw e;
  }
}
