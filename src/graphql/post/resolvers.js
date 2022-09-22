const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  const post = await response.json(); //alterado para aula 31 para tratar o if abaixo

  if (typeof post.id == 'undefined') {
    return {
      statusCode: 404,
      message: 'Post not found!',
    };
  }
  return post;
};
const posts = async (_, { input }, { getPosts }) => {
  const ApiFiltersInput = new URLSearchParams(input);
  const response = await getPosts('/?' + ApiFiltersInput);
  return response.json();
};

export const postResolvers = {
  Query: { post, posts },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },

  PostResult: {
    __resolverType: (obj) => {
      if (typeof obj.statusCode !== 'undefined') return 'PostNotFoundError'; // PostResult aula 31 caso não tiver o post apresenta a mensagem de erro
      if (typeof obj.id !== 'undefined') return 'Post'; // se tiver o post no id apresenta o post
      return null; // senão retorna null
    },
  },
};
