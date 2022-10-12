import { ApolloServer } from 'apollo-server';
import { PostsApi } from './graphql/post/datasource';
import { UsersApi } from './graphql/user/datasource';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './graphql/user/context';
import { LoginApi } from './graphql/login/datasource';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
<<<<<<< HEAD
      loginApi: new LoginApi(), // aula 58

=======
      loginApi: new loginApi(), // aula 58
>>>>>>> parent of 15c2385 (creater mutation_008)
    };
  },
});

server.listen(7959).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});


