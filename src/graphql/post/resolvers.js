// Query resolvers
const post = async (_, { id }, { DataSource }) => {
  const post = DataSource.postApi.getPost(id);
  return post;
};
const posts = async (_, { input }, { DataSource }) => {
  const posts = DataSource.postApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, data, { DataSource }) => {
  return DataSource.postApi.createPost(data);
};


// Field resolver
const user = async ({ userId }, _, { DataSource }) => {
  return DataSource.userApi.batchLoadById(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost },
  Post: { user },
};
