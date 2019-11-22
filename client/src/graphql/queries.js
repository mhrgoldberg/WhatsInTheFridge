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
  CURRENT_USER_RECIPES: gql`
    query CurrentUser {
      currentUser @client {
        savedRecipes {
          id
        }
      }
    }
  `,
};

export default queries;