import { fetch } from 'expo/fetch';
import { Alert } from 'react-native';

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
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Accept-Charset', 'utf-8');
  try {
    const result = await fetch(url, {
      headers,
      method,
      body: bodyStr,
    });
    const js = await result.json();
    if (js.error) {
      switch (js.error) {
        case 'nodata':
          showErrorAlertDialog({
            title: 'No Data Found',
            message: 'No response data found for this request',
          });
          break;
      }
      throw new Error(js.error);
    }
    return {
      body: js,
      status: result.status,
      headers: result.headers,
    };
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
    return {
      status: 500,
      body: { message: error.message },
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

export function showErrorAlertDialog({ title, message }) {
  Alert.alert(title, message);
}
