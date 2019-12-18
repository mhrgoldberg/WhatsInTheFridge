const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;
require("../models");
const mongoose = require("mongoose");
const UserType = require("./types/user_type");
const RecipeType = require("./types/recipe_type");
const Recipe = mongoose.model("recipes");
const AuthService = require("../services/auth.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    saveRecipe: {
      type: RecipeType,
      args: {
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
      },
      resolve(_, args) {
        debugger;
        return new Recipe(args).save();
      }
    },
    removeRecipe: {
      type: RecipeType,
      args: {_id: { type: GraphQLID }},
      resolve(_, { _id }) {
        return Recipe.remove({ _id });
      }
    }
  }
});

module.exports = mutation;
