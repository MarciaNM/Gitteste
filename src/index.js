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

<<<<<<< HEAD
server.listen(7956).then(({ url }) => {
=======
server.listen(7955).then(({ url }) => {
>>>>>>> 54588f2147c07994488e4576f1c584ba7905e638
  console.log(`Server Listening on url ${url}`);
});
