import gql from "graphql-tag";

const mutations = {
  LOGIN_USER: gql`
    mutation LoginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        loggedIn
        _id
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
        _id
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($username: String!, $password: String!) {
      register(username: $username, password: $password) {
        token
        loggedIn
        _id
      }
    }
  `,
  SAVE_RECIPE: gql`
    mutation SaveRecipe($name: String!, $recipeURL: String!, $imageURL: String!, $servings: Int!, $calories: Float!, $ingredients: [String!]!, $carbsTotal: Float!, $carbsDaily: Float!, $fatsTotal: Float!, $fatsDaily: Float!, $proteinTotal: Float!, $proteinDaily: Float!, $userId: ID!) {
      saveRecipe(name: $name, recipeURL: $recipeURL, imageURL: $imageURL, servings: $servings, calories: $calories, ingredients: $ingredients, carbsTotal: $carbsTotal, carbsDaily: $carbsDaily, fatsTotal: $fatsTotal, fatsDaily: $fatsDaily, proteinTotal: $proteinTotal, proteinDaily: $proteinDaily, userId: $userId) {
        _id
        name
        recipeURL
        imageURL
        servings
        calories
        ingredients
        carbsTotal
        carbsDaily
        fatsTotal
        fatsDaily
        proteinTotal
        proteinDaily
        userId
      }
    }
  `,
  SAVE_INGREDIENT: gql`
    mutation SaveIngredient($name: String!, $quantity: Float!, $measureLabel: String!, $calories: Float!, $carbsTotal: Float!, $fatsTotal: Float!, $proteinTotal: Float!, $recipeId: ID!, $userId: ID!) {
      saveIngredient(name: $name, quantity: $quantity, measureLabel: $measureLabel, calories: $calories, carbsTotal: $carbsTotal, fatsTotal: $fatsTotal, proteinTotal: $proteinTotal, recipeId: $recipeId, userId: $userId) {
        _id
        name
        quantity
        calories
        carbsTotal
        fatsTotal
        proteinTotal
        recipeId
        userId
      }
    }
  `
};

export default mutations;