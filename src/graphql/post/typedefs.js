import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post! # neste chamada chamo todos os campos do type
    posts(input: ApiFiltersInput): [Post!]! # aqui chama todos os posts que tem
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User! # inserção da aula 34 e tratado no resolvers
    indexRef: Int!
    createdAt: String!
  }
`;
