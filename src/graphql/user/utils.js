export const getUsers = (fetch) => {
  return fetch(process.env.API_URL + '/users' + '/');
};
