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
    mutation SaveRecipe($name: String!, $recipeURL: String!, $imageURL: String!, $servings: Int!, $calories: Float!, $ingredients: [String!]!, $carbsTotal: Float!, $fatsTotal: Float!, $proteinTotal: Float!, $userId: ID!) {
      saveRecipe(name: $name, recipeURL: $recipeURL, imageURL: $imageURL, servings: $servings, calories: $calories, ingredients: $ingredients, carbsTotal: $carbsTotal, fatsTotal: $fatsTotal, proteinTotal: $proteinTotal, userId: $userId) {
        name
        recipeURL
        imageURL
        servings
        calories
        ingredients
        carbsTotal
        fatsTotal
        proteinTotal
        userId
      }
    }
  `,
  SAVE_INGREDIENT: gql`
    mutation SaveIngredient($name: String!, $quantity: Float!, $measureLabel: String!, $calories: Float!, $carbsTotal: Float!, $fatsTotal: Float!, $proteinTotal: Float!, $userId: ID!) {
      saveIngredient(name: $name, quantity: $quantity, measureLabel: $measureLabel, calories: $calories, carbsTotal: $carbsTotal, fatsTotal: $fatsTotal, proteinTotal: $proteinTotal, userId: $userId) {
        name
        quantity
        calories
        carbsTotal
        fatsTotal
        proteinTotal
        userId
      }
    }
  `
};

export default mutations;