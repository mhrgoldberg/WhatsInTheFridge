const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const mutation = require("./mutations.js");
const query = require("./types/root_query_type");

module.exports = new GraphQLSchema({
  query,
  mutation
});
