import { ApolloServer } from 'apollo-server';
import fetch from 'node-fetch';

import { resolvers, typeDefs } from './graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      hello: 123,
    };
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});
