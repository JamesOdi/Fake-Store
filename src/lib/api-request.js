import { fetch } from 'expo/fetch';

export async function apiRequest({ route, routeParams, bodyParams }) {
  // see: https://docs.expo.dev/guides/environment-variables/
  // It defines how expo environment variables are defined
  const BASE_URL =
    process.env.EXPO_PUBLIC_SERVER_BASE_URL || 'http://localhost:3000/';

  const method = route.method;
  const path = route.path;

  if (routeParams) {
    const routeKeys = Object.keys(routeParams);

    routeKeys.forEach((key) => {
      path.replace(`:${key}`, routeParams[key]);
    });
  }

  const url = BASE_URL + path;
  let bodyStr = JSON.stringify(bodyParams);

  if (method == 'GET' || method == 'DELETE') {
    bodyStr = undefined;
  }

  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const result = await fetch(url, {
      headers,
      method,
      body: bodyStr,
    });
    const js = await result.json();
    return {
      body: js,
      status: result.status,
      headers: result.headers,
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: error.message },
      headers: new Headers(),
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
