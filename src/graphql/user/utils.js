// criado arquivo aula 37, criado este arquivo, vou no arquivo context e no return coloco getUsers
export const getUsers = (fetch) => (path = '/') => {
  return fetch(process.env.API_URL + '/users' + path);
};
