import gql from "graphql-tag";

const mutations = {
  LOGIN_USER: gql`
    mutation LoginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($username: String!, $password: String!) {
      register(username: $username, password: $password) {
        token
        loggedIn
      }
    }
  `,

};

export default mutations;