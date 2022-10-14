import { AuthenticationError } from 'apollo-server-errors';
// Query resolvers
const users = async (_, { input }, { dataSources }) => {
  const users = dataSources.userApi.getUsers(input);
  return users;
};
const user = async (_, { id }, { dataSources }) => {
  const user = dataSources.userApi.getUser(id);
  return user;
};

// Mutation resolvers - aula 50
const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data);
};
const updateUser = async (_, { userId, data }, { dataSources, loggedUserId }) => {
  if (!loggedUserId) { // aula 60
    throw new AuthenticationError('you have to log in');
  }
  if (loggedUserId !== userId) { // aula 60
    throw new AuthenticationError('you cannot update this user.');
  }
  return dataSources.userApi.updateUser(userId, data);
};
const deleteUser = async (_, { userId }, { dataSources }) => {
  return dataSources.userApi.deleteUser(userId);
};
// Field resolvers
const posts = async ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadById(id);
};

export const userResolvers = {
  Query: { user, users },
  Mutation: { createUser, updateUser, deleteUser }, // inserido aula 50
  User: { posts },
};
