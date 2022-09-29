import fetch from 'node-fetch';

const API_URL = process.env.API_URL;

const get = (endPoint, urlParam, requestInit) => {
  const url =
    API_URL + '/' + endPoint + '?' + new URLSearchParams(urlParam).toString();
  return fetch(url, {
    method: 'GET',
    Headers: {
      'Context-Type': 'application/json',
    },
    ...requestInit,
  });
};
const post = (endPoint, body, requestInit = {}) => {
  const url = API_URL + '/' + endPoint;
  return fetch(url, {
    method: 'POST',
    Headers: {
      'Context-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};
(async () => {
  const userResponse = await post('users', {
    id: '7000',
    firstName: 'CRIADO - Márcia',
    lastName: 'CRIADO -Carvalho',
    userName: 'CRIADO -Marcia_carvalho81',
    indexRef: 1,
    createdAt: 'CRIADO -2016-12-08T00:49:39.870Z',
  });
  const user = await userResponse.json();
  console.log(user);
})();
