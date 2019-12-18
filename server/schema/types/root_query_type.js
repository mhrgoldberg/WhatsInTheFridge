require("../../models");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const axios = require("axios");

const UserType = require("./user_type.js");
const RecipeType = require("./recipe_type.js");
const APIRecipeType = require("./api_recipe_type.js");

const User = mongoose.model("users");
const Recipe = mongoose.model("recipes");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    savedRecipes: {
      type: new GraphQLList(RecipeType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID)}},
      resolve(_, args) {
        return Recipe.find(args.userId);
      }
    },
    // apiRecipes: {
    //   type: new GraphQLList(APIRecipeType),
    //   args:
    // },
    recipe: {
      type: RecipeType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID)}},
      resolve(_, args) {
        return Recipe.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;
