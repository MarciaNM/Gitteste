import { ApolloServer } from 'apollo-server';

import { resolvers, typeDefs } from './graphql/schema';
import { context } from './graphql/user/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen(7952).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});
