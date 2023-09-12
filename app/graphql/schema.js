const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const taskResolver = require('./resolvers/taskResolver');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: taskResolver.tasks,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});


