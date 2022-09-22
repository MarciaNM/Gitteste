import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }
  union PostResult = PostNotFoundError | PostTimeOutError | Post

  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }
  type PostTimeOutError implements PostError {
    statusCode: Int!
    message: String!
    timeout: String!
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
