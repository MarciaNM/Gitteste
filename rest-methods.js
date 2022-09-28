import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
const API_URL = process.env.API_URL;

// eslint-disable-next-line no-unused-vars
const get = (endPoint, urlParam, requestInit = {}) => {
  return fetch(
    API_URL + '/' + endPoint + '?' + new URLSearchParams(urlParam).toString(),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...requestInit,
    },
  );
};
const post = (endPoint, body, requestInit = {}) => {
  const url = API_URL + '/' + endPoint;
  // eslint-disable-next-line no-undef
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
    // eslint-disable-next-line prettier/prettier
    },
  );
};
(async () => {
  // GET- Ler
  // const userGetResponse = await get('users/502');
  //const user = await userGetResponse.json();
  //console.log(user);

  // POST - Criar // criado o id 6000 com alterações e foi salvo no arquivo d.j para teste
  const userResponse = await post('users', {
    id: '6000',
    firstName: 'CRIADO - Márcia',
    lastName: 'CRIADO -Carvalho',
    userName: 'CRIADO -marcia_carvalho81',
    indexRef: 1,
    createdAt: 'CRIADO -2016-12-08T00:49:39.870Z',
  });
  const user = await userResponse.json();
  console.log(user);
})();
