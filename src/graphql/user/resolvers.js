const users = async (_, __, { getUsers }) => {
  const users = await getUsers(); // criado caminho no arquivo context.js
  return users.json();
};

const user = async (_, { id }, { fetch }) => {
  const response = await fetch('/' + id); // para não ficar duplicado o caminho no código
  const user = await response.json();
  return user();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
