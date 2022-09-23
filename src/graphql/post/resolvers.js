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

const user = async ({ userId }, _, { userDataloader }) => {
  return userDataloader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user }, // criado aula 34 e tratado no user acima
};
