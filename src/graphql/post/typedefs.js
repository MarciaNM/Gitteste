import { gql } from 'apollo-server-core';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    updatePost(postId: ID!, data: UpdatePostInput!): Post!
    deletePost(postId: ID!): Boolean! # inserção aula 48
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
  }
  input CreatePostInput {
    title: String!
    body: String!
    #userId: String! comentado para aula 65
  }
  input UpdatePostInput {
    title: String
    body: String
    #userId: String // comentado para aula 66
  }
`;
