import DataLoader from 'dataloader'; // baixado e importado dataloader aula 36
import fetch from 'node-fetch'; // aula 36

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  const post = await response.json(); //alterado para aula 31 para tratar o if abaixo
  return post;
};
const posts = async (_, { input }, { getPosts }) => {
  const ApiFiltersInput = new URLSearchParams(input);
  const response = await getPosts('/?' + ApiFiltersInput);
  return response.json();
};
// aula 36 userDataloader
const userDataloader = new DataLoader(async (ids) => {
  const urlQuery = ids.join('&id='); //criando url com os id na ordem
  const url = 'http://localhost:3000/users/?id=' + urlQuery;
  const response = await fetch(url);
  const users = await response.json();
  //console.log(users); // para mostrar no terminal os id se quiser
  //console.log(url); // para mostrar no terminal a url se quiser
  return ids.map((id) => users.find((user) => user.id == id));
});

// eslint-disable-next-line no-unused-vars
const user = async ({ userId }, _, { getUsers }) => {
  return userDataloader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user }, // criado aula 34 e tratado no user acima
};
