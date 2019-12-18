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
import IngredientSearch from "./ingredient_search";

const App = () => {
  return (
    <Switch>
      <Route path="/ingredient" component={IngredientSearch} />
      <AuthRoute exact path="/" component={Splash} routeType="auth" />
    </Switch>
  );
};

export default App;
