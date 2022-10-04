// Query resolvers
const post = async (_, { id }, { DataSource }) => {
  const post = DataSource.PostApi.getPost(id);
  return post;
};
const posts = async (_, { input }, { DataSource }) => {
  const posts = DataSource.PostApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, { data }, { DataSource }) => {
  return DataSource.PostApi.createPost(data);
};

// Field resolver
const user = async ({ userId }, _, { DataSource }) => {
  return DataSource.PostApi.batchLoadById(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost },
  Post: { user },
};
