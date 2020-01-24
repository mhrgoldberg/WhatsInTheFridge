const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLFloat, GraphQLInt } = graphql;

const IngredientType = new GraphQLObjectType({
  name: "IngredientType",
  fields: () => ({
    name: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    measureLabel: { type: GraphQLString },
    calories: { type: GraphQLFloat },
    carbsTotal: { type: GraphQLFloat },
    fatsTotal: { type: GraphQLFloat },  
    proteinTotal: { type: GraphQLFloat }
  })
});

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
    fatsTotal: { type: GraphQLFloat },  
    proteinTotal: { type: GraphQLFloat }
  })
});

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
