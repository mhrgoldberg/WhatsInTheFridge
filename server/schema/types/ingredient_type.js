const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat } = graphql;

const IngredientType = new GraphQLObjectType({
  name: "IngredientType",
  fields: () => ({
    name: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    measureLabel: { type: GraphQLString },
    calories: { type: GraphQLFloat },
    carbsTotal: { type: GraphQLFloat },
    fatsTotal: { type: GraphQLFloat },  
    proteinTotal: { type: GraphQLFloat },
    recipeId: { type: GraphQLID },
  })
});

module.exports = IngredientType;