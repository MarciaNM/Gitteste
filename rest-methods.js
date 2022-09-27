import fetch from 'node-fetch';
const API_URL = process.env.API_URL;

const get = (endPoint, URLSearchParams, requestInit = {}) => {
  const url =
    // eslint-disable-next-line prettier/prettier
    API_URL + '/' + endPoint + '?' + new URLSearchParams(URLSearchParams).toString();
  // eslint-disable-next-line prettier/prettier
    console.log(url);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application-json',
    },
    ...requestInit,
    // eslint-disable-next-line prettier/prettier
  },
);
};
(async () => {
  const userGetResponse = await get('users');
  const user = await userGetResponse.json();
  console.log(user);
})();
