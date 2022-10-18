import { AuthenticationError } from 'apollo-server-errors';
import { checkIsLoggedIn } from '../login/utils/login-functions';
// Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};
const posts = async (_, { input }, { dataSources, loggedUserId }) => {
  console.log(loggedUserId); // aula 59
  if (!!loggedUserId) { // aula 59
    throw new AuthenticationError('you have to log in');
  }

  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId); // aula 65, verifica se userId está logado
  data.userId = loggedUserId; // aula 65
  return dataSources.postApi.createPost(data);
};

const updatePost = async (_, { postId, data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);// aula 66
  return dataSources.postApi.updatePost(postId, data);
};
const deletePost = async (_, { postId }, { dataSources }) => { //aula 48
  return dataSources.postApi.deletePost(postId);
};

// Field resolver
const user = async ({ userId }, _, { dataSources }) => {
  // console.log(dataSources)
  return dataSources.userApi.batchLoadById(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost, updatePost, deletePost },
  Post: { user },
};
