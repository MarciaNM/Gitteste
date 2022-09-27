const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.gePost(id);
  return post;
};
const posts = async (_, { input }, { dataSources }) => {
  const posts = dataSources.postApi.gePosts(input);
  return posts;
};

const user = async ({ userId }, _, { userDataloader }) => {
  return userDataloader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};
