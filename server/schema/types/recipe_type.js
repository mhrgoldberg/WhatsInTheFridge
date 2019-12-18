const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const RecipeType = new GraphQLObjectType({
  name: "RecipeType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    userId: { type: GraphQLID },
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

module.exports = RecipeType;