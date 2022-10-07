import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(input: ApiFiltersInput): [User!]!
  }
  # aula 50 criação mutation do user
  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(userId: ID!, data: UpdateUserInput!): User! # ve se o userId existe na base de dados e atualiza ele
    deleteUser(userId: ID!): Boolean!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }
    # aula 50 criação mutation do user
  input CreateUserInput {
    firstName: String!
    lastName: String!
    userName: String!
  }
    # aula 50 criação mutation do user
  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
  }
`;
