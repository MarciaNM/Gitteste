export const getPosts = (fetch) => {
  return fetch(process.env.API_URL + '/users' + '/');
};
