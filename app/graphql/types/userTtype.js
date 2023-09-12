const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

module.exports = TaskType;
