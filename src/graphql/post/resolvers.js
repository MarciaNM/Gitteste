// Query resolvers
const post = async (_, { id }, { DataSource }) => {
  const post = DataSource.PostsApi.getPost(id);
  return post;
};
const posts = async (_, { input }, { DataSource }) => {
  const posts = DataSource.PostsApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, { data }) => {
  return DataSource.PostsApi.createPost(data);
};

// Field resolver
const user = async ({ userId }, _, { DataSource }) => {
  return DataSource.PostsApi.batchLoadById(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost },
  Post: { user },
};
