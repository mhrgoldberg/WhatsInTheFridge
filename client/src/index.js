import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HashRouter } from "react-router-dom";
// import { Mutation } from "react-apollo";
import mutations from "./graphql/mutations";
import queries from "./graphql/queries";

const { INGREDIENT_MODAL_STATUS } = queries;

const VERIFY_USER = mutations.VERIFY_USER;

let client;
let cache;

async function setupClient() {
  cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null
  });

  let uri = "http://localhost:5000/graphql";

  if (process.env.NODE_ENV !== "development") {
    uri = "/graphql";
  }

  const httpLink = createHttpLink({
    // comment out uri when pushing to heroku
    uri,
    headers: {
      authorization: localStorage.getItem("auth-token")
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
    if (networkError) console.log(networkError);
  });

  const link = ApolloLink.from([errorLink, httpLink]);

  client = new ApolloClient({
    link,
    cache,
    resolvers: {
      Mutation: {
        toggleIngredientsModal: (_, { ingredientsData }, { cache }) => {
          const modalStatus = cache.readQuery({ INGREDIENT_MODAL_STATUS });
          const data = {
            ingredientsModal: !modalStatus.ingredientsModal,
            ingredientsData: ingredientsData
          };
          cache.writeData({ data });
          return null;
        }
      }
    }
    // onError: ({ networkError, graphQLErrors }) => {
    //   console.log("graphQLErrors", graphQLErrors);
    //   console.log("networkError", networkError);
    // }
    // }
  });
}

async function populateCache() {
  const token = localStorage.getItem("auth-token");
  await cache.writeData({
    data: {
      isLoggedIn: Boolean(token),
      healthModal: false,
      ingredientsModal: false,
      healthFactsData: {
        calories: 0,
        servings: 0,
        carb: 0,
        protein: 0,
        fat: 0
      },
      ingredientsData: []
    }
  });

  if (token) {
    await client
      .mutate({ mutation: VERIFY_USER, variables: { token } })
      .then(({ data }) => {
        cache.writeData({
          data: {
            isLoggedIn: data.verifyUser.loggedIn,
            currentUser: data.verifyUser._id
          }
        });
      });
  }
}

setupClient()
  .then(() => populateCache())
  .then(() => {
    const Root = () => {
      return (
        <ApolloProvider client={client}>
          <HashRouter>
            <App />
          </HashRouter>
        </ApolloProvider>
      );
    };

    ReactDOM.render(<Root />, document.getElementById("root"));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
