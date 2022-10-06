import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(input: ApiFiltersInput): [User!]!
  }
  # aula 50 criação mutation do user
  extend type Mutation {
    createUSer(data: CreateUserInput!): User!
    updateUser(userId: ID!, data: UpdateUserInput!): User!
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
    firstName: String!
    lastName: String!
    userName: String!
  }
`;
