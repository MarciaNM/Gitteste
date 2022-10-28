import { ApolloServer } from 'apollo-server';
import { PostsApi } from './graphql/post/datasource';
import { UsersApi } from './graphql/user/datasource';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './context';
import { LoginApi } from './graphql/login/datasource';



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(), // aula 58

    };
  },
});
const port = process.env.Port || 7964;
server.listen(7964).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});


