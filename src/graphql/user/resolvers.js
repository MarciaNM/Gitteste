const users = async (_, { input }, { getUsers }) => {
  const ApiFiltersInput = new URLSearchParams(input);
  const users = await getUsers('/? + ApiFiltersInput'); // criado caminho no arquivo context.js
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const response = await getUsers('/' + id); // para não ficar duplicado o caminho no código
  const user = await response.json();
  return user;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
