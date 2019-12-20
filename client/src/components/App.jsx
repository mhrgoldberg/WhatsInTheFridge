// import logo from "../logo.svg";
import "../App.css";
import React from "react";
// import { Query } from "react-apollo";
import { Route, Switch } from "react-router-dom";
import Login from "./Login.jsx";

import Splash from "./Splash.jsx";
import Register from "./Register.jsx";
import AuthRoute from "../util/route_util.js";
import "../stylesheets/main.scss";
import Search from './RecipeSearch/Search.jsx';
import SearchAdvanced from './RecipeSearch/SearchAdvanced.jsx';
import UnsavedRecipe from './RecipeSearch/UnsavedRecipe.jsx';

const App = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Splash} routeType="auth" />
      <Route exact path="/search" component={Search} />
      <Route exact path="/advanced-search" component={SearchAdvanced} />

      <Route exact path="/unsaved-recipe/:recipe_url" component={UnsavedRecipe} />
    </Switch>
  );
};

export default App;
