import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      user: User!
      users: [User!]!
    }
    type User {
      id: ID!
      userName: String!
    }
  `,
  resolvers: {
    Query: {
      user: () => {
        return {
          id: '12233',
          userName: 'Marcia',
        };
      },
      users: () => {
        return [
          {
            id: '1',
            userName: 'Marcia',
          },
          {
            id: '2',
            userName: 'Maria',
          },
          {
            id: '3',
            userName: 'Marcos',
          },
        ];
      },
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`Server Listening on url ${url}`);
});
