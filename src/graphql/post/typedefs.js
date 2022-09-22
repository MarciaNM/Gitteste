import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersInput): [Post!]!
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
