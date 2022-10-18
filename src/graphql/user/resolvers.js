import { checkOwner } from '../login/utils/login-functions';
// Query resolvers
const users = async (_, { input }, { dataSources }) => {
  const users = await dataSources.userApi.getUsers(input);
  return users;
};
const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

// Mutation resolvers - aula 50
const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data);
};
const updateUser = async (_, { userId, data }, { dataSources, loggedUserId }) => {
  console.log(loggedUserId);
  checkOwner(userId, loggedUserId); // aula 63
   return dataSources.userApi.updateUser(userId, data);
};
const deleteUser = async (_, { userId }, { dataSources, loggedUserId }) => {
  checkOwner(userId, loggedUserId);// aula 63
  return dataSources.userApi.deleteUser(userId);
};
// Field resolvers
async function posts({ id }, _, { dataSources }) {
  return dataSources.postApi.batchLoadById(id);
};

export const userResolvers = {
  Query: { user, users },
  Mutation: { createUser, updateUser, deleteUser }, // inserido aula 50
  User: { posts },
};
