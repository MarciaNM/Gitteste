const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  return response.json();
};
const posts = async (_, { input }, { getPosts }) => {
  const apiFiltersInput = new URLSearchParams(input);
  console.log(apiFiltersInput.toString());
  const response = await getPosts();
  return response.json();
};

export const postResolvers = {
  Query: { post, posts },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const timestemp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestemp);
    },
  },
};
