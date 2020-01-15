import gql from "graphql-tag";

const queries = {

  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  CURRENT_USER: gql`
    query CurrentUser {
      currentUser @client
    }
  `,
  GET_CURRENT_USER_INGREDIENTS: gql`
    query User($id: ID!) {
      user(_id: $id) {
        savedIngredients
      }
    }
  `,
  GET_CURRENT_USER_RECIPES: gql`
    query User($id: ID!) {
      user(_id: $id) {
        savedRecipes
      }
    }
  `,
  GET_RECIPE: gql`
    query GetRecipe($id: ID!) {
      savedRecipes(_id: $id) {
        name
        recipeURL
        imageURL
        calories
        servings
        ingredients
        carbsTotal
        carbsDaily
        fatsTotal  
        fatsDaily
        proteinTotal
        proteinDaily:
      }
    }
  `,
  GET_INGREDIENT: gql`
    query GetIngredient($id: ID!) {
      savedIngredients(_id: $id) {
        name
        quantity
        measureLabel
        calories
        carbsTotal
        fatsTotal  
        proteinTotal
        recipeId
      }
    }
  `
};

export default queries;