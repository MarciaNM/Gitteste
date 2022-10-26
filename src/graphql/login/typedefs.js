// aula 58
import { gql } from 'apollo-server-core';

export const loginTypeDefs = gql`
  extend type Mutation {
    login(data: LoginInput!): Login!
    logout(userName: String!): Boolean! #aula 68
  }

  input LoginInput{
    userName: String!
    password: String!
  }
  type Login {
    userId: String!
    token: String!
  }
`;
