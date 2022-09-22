import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }
  # criado o union e o type PostNotFoundError para tratar se o post não existir
  #inserção da aula 31 Union Types e alterado o post(id: ID!): PostResult! acima
  union PostResult = PostNotFoundError | Post

  type PostNotFoundError {
    statusCode: Int!
    message: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    #userId (user: USer!)
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String! #Criado esse campo para testar no resolvers,um campo há mais que não tinha na base de dados
  }
`;
