const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const APIRecipeType = new GraphQLObjectType({
  name: "APIRecipeType",
  fields: () => ({
    name: { type: GraphQLString },
    recipeURL: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    calories: { type: GraphQLInt },
    servings: { type: GraphQLInt },
    ingredients: { type: GraphQLList },
    macros: {
      carbs: {
        total: { type: GraphQLInt },
        daily: { type: GraphQLInt }
      },
      fats: {
        total: { type: GraphQLInt },
        daily: { type: GraphQLInt }
      },
      protein: {
        total: { type: GraphQLInt },
        daily: { type: GraphQLInt }
      }
    }
  })
});

module.exports = APIRecipeType;