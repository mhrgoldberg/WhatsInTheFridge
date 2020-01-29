const mongoose = require("mongoose");
const graphql = require("graphql");
const IngredientType = require("./ingredient_type")
const RecipeType = require("./recipe_type")
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLFloat, GraphQLInt } = graphql;


const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    savedRecipes: { type: new GraphQLList(RecipeType) },
    savedIngredients: { type: new GraphQLList(IngredientType) }
  })
});

module.exports = UserType;
