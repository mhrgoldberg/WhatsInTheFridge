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
};

export default queries;