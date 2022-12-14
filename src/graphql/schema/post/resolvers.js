import { AuthenticationError } from 'apollo-server-errors';
import { checkIsLoggedIn } from '../login/utils/login-functions';


// Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources, loggedUserId }) => {
  //console.log(loggedUserId); // aula 59
  if (!!!loggedUserId) { // aula 59 verifica se o userId pelo token não está logado mostra o erro
    throw new AuthenticationError('you have to log in');
  }

  const posts = dataSources.postApi.getPosts(input);
  return posts;

};

// Mutation resolvers
const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
  //console.log(loggedUserId);
  checkIsLoggedIn(loggedUserId); // aula 65, verifica se userId está logado
  data.userId = loggedUserId; // aula 65
  return dataSources.postApi.createPost(data);
}

const updatePost = async (_, { postId, data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);// aula 66
  return dataSources.postApi.updatePost(postId, data);
};

const deletePost = async (_, { postId }, { dataSources, loggedUserId }) => { //aula 48
  checkIsLoggedIn(loggedUserId); // aula 67
  return dataSources.postApi.deletePost(postId);
};

// Field resolver
const user = async ( userId , _, { dataSources }) => {
 
  if (!userId.userId) {
    //console.log("fieldUser,",userId)
  }
    return dataSources.userApi.batchLoadById(userId.userId);
   
};
const comments = async ({ id: post_id}, _, {dataSources}) => {
 return dataSources.commentDb.batchLoad(post_id);
};

export const postResolvers = {
  Query: { post, posts }, 
  Mutation: { createPost, updatePost, deletePost },
  Post: { user, comments },
};
