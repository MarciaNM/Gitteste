import { gql } from 'apollo-server',
const rootTypeDefs = gql`
  type Query {
  hi: String
  }
`;


export const typeDefs = [rootTypeDefs];
export const resolvers = [];
