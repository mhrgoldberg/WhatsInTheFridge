const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat } = graphql;

const RecipeType = new GraphQLObjectType({
  name: "RecipeType",
  fields: () => ({
    name: { type: GraphQLString },
    recipeURL: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    calories: { type: GraphQLFloat },
    servings: { type: GraphQLInt },
    ingredients: { type: new GraphQLList(GraphQLString) },
    carbsTotal: { type: GraphQLFloat },
    carbsDaily: { type: GraphQLFloat },
    fatsTotal: { type: GraphQLFloat },  
    fatsDaily: { type: GraphQLFloat },
    proteinTotal: { type: GraphQLFloat },
    proteinDaily: { type: GraphQLFloat },
  })
});

module.exports = RecipeType;