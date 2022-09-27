const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};
const posts = async (_, { input }, { getPosts }) => {
  const ApiFiltersInput = new URLSearchParams(input);
  const response = await getPosts('/?' + ApiFiltersInput);
  return response.json();
};

const user = async ({ userId }, _, { userDataloader }) => {
  return userDataloader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};
