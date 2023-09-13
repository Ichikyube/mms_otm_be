import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import UserType from './types/userType.js';
import userResolver from './resolvers/userResolver.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task:userResolver.user,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});