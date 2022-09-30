import { ApolloServer } from 'apollo-server';
import { PostsApi } from './graphql/post/datasource';
import { UsersApi } from './graphql/user/datasource';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './graphql/user/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSource: () => {
    return {
      postApi: new PostsApi(),
    };
  },
});

server.listen(7956).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});


