// import logo from "../logo.svg";
import "../App.css";
import React from "react";
// import { Query } from "react-apollo";
import { Route, Switch } from "react-router-dom";
import Splash from "./Splash.jsx";
import AuthRoute from "../util/route_util.js";
import "../stylesheets/main.scss";
import NutritionPieChart from "./nutrition_pie_chart";
import Search from "./Search.jsx";
import SearchAdvanced from "./SearchAdvanced.jsx";
import IngredientForm from "./grocery_list/ingredient_form";
import IngredientSearch from "./fridge/ingredient_search";

const App = () => {
  return (
    <Switch>
      <Route path="/ingredient" component={IngredientSearch} />
      <AuthRoute exact path="/" component={Splash} routeType="auth" />
      <Route exact path="/search" component={Search} />
      <Route exact path="/advanced-search" component={SearchAdvanced} />
    </Switch>
  );
};

export default App;
