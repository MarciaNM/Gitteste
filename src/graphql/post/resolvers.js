const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  return response.json();
};
const posts = async (_, __, { getPosts }) => {
  const response = await getPosts();
  return response.json();
};

export const postResolvers = {
  Query: { post, posts },
  Post: {
    unixTimestamp: ({ createdAT }) => {
      const timestamp = new Date(createdAT).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};

/*esse post não é da query e sim resolver resolvendo depois do post
foi testado este campo da base e modificado a data para ver em milisegundos o valor
getTime()/1000:dividi em segundos arrendonda para baixo
e para validar pode buscar os segundos no site epochconverter.com e confere com a data que está no banco de dados,
pode dar uma diferença na consulta por que o GMT pode dar pouca diferença
*/
