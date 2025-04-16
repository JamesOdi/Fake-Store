export async function apiRequest({ route, routeParams, bodyParams }) {
  const BASE_URL =
    process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:3000/';

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
    console.log('result', JSON.stringify(error, null, 2));
    return {
      status: 500,
      body: { message: 'Error making api request' },
      headers: new Headers(),
    };
  }
}
