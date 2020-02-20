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
  HEALTH_MODAL: gql`
    query HealthModalStatus {
      healthModal @client
    }
  `,
  INGREDIENT_MODAL_STATUS: gql`
    query IngredientsModalStatus {
      ingredientsModal @client
      ingredientsData @client
    }
  `,

  GET_CURRENT_USER_INGREDIENTS: gql`
    query User($id: ID!) {
      user(_id: $id) {
        savedIngredients {
          name
          quantity
          measureLabel
          calories
        }
      }
    }
  `,
  GET_CURRENT_USER_RECIPES: gql`
    query User($id: ID!) {
      user(_id: $id) {
        savedRecipes {
          name
          recipeURL
          imageURL
          calories
          servings
          ingredients
          carbsTotal
          fatsTotal  
          proteinTotal
          userId
        }
      }
    }
  `
};

export default queries;