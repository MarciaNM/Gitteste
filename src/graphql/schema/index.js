import { gql } from 'apollo-server';

import { apiFiltersResolvers } from './api-filters/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';

import { commentTypedefs } from './comment/typedefs';
import { commentResolvers } from './comment/resolvers';

import { loginResolvers } from './login/resolvers';
import { loginTypeDefs } from './login/typedefs';

import { postResolvers } from './post/resolvers';
import { postTypeDefs } from './post/typedefs';

import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typedefs';


const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },

  Mutation: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs, 
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
  loginTypeDefs, // aula 58
  commentTypedefs, // aula 87
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers, // aula 58
  commentResolvers, // aula 88
];
