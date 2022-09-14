const post = () => {
  return {
    id: '1',
    title: 'Post title 1',
  };
};
const posts = () => {
  return [
    {
      id: '1',
      title: 'title 1',
    },
    {
      id: '2',
      title: 'title 2',
    },
    {
      id: '3',
      title: 'title 3',
    },
  ];
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
