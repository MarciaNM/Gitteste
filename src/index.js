import { ApolloServer } from 'apollo-server';

import { knex } from './knex/';

import { PostsApi } from './graphql/schema/post/datasource';
import { UsersApi } from './graphql/schema/user/datasource';

import { resolvers, typeDefs } from './graphql/schema';

import { context } from './graphql/context/context';

import { LoginApi } from './graphql/schema/login/datasource';

import { CommentSQLDatasource} from './graphql/schema/comment/datasource';




const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(), // aula 58
      commentDb: new CommentSQLDatasource(knex),

    };
  },
});

const port = process.env.Port || 7965;
server.listen(7965).then(({ url }) => {
console.log(`Server Listening on url ${url}`);
 
});

