const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  const post = response.json(); //alterado para aula 31 para tratar o if abaixo

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
      const timestemp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestemp);
    },
  },

  PostResult: {
    // criado para resolver o typedefes da aula 31 Type Union
    __resolverType: (obj) => {
      if (typeof obj.statusCode !== 'undefinid') return 'PostNotFoundError'; // caso não tiver o post apresenta a mensagem de erro
      if (typeof obj.id !== 'undefined') return 'Post'; // se tiver o post no id apresenta o post
      return null; // senão retorna null
    },
  },
};
