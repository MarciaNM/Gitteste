// Query resolvers
const post = async (_, { id }, { dataSource }) => {
  const post = dataSource.postApi.getPost(id);
  return post;
};
const posts = async (_, { input }, { dataSource }) => {
  const posts = dataSource.postApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, args, { dataSource }) => {
  console.log(args);
  return {
    id: '601',
    title: 'Nihil nunquam eum iuri consequatur',
    body: 'Menor',
    userId: '502',
    indexRef: '19',
    createAt: '2017-04-26T19:39:05.420Z',
  };
};


// Field resolver
const user = async ({ userId }, _, { userDataloader }) => {
  return userDataloader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost },
  Post: { user },
};
