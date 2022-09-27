import fetch from 'node-fetch';
const API_URL = process.env.API_URL;

const get = (endPoint, urlParam, requestInit = {}) => {
  return fetch(
    API_URL + '/' + endPoint + '?' + new URLSearchParams(urlParam).toString(),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
      },
      ...requestInit,
    },
  );
};
(async () => {
  const userGetResponse = await get('users');
  const user = await userGetResponse.json();
  console.log(user);
})();
