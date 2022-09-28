import { ApolloServer } from 'apollo-server';
import { PostsApi } from './graphql/post/datasources';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './graphql/user/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
    };
  },
});

server.listen(7955).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});
