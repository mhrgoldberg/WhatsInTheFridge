import logo from "../logo.svg";
import "../App.css";
import React, { Component } from "react";
import { Query } from "react-apollo";
import { Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Nav from "./Nav.js";
import Register from "./Register.js";
import AuthRoute from "../util/route_util.js";
import '../stylesheets/main.scss';
import Search from './Search.js';
import SearchAdvanced from'./SearchAdvanced.js';

const App = () => {
  return (
    <div>
      <Nav />
      <h1 className="title">What's in the Fridge</h1>
      <Switch>
        <AuthRoute
          exact
          path="/register"
          component={Register}
          routeType="auth"
        />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <Route exact path="/search" component={Search} /> 
        <Route exact path="/advanced-search" component={SearchAdvanced} />

        {/* <Route exact path="/" component={} /> */}
      </Switch>
    </div>
  );
};

export default App;
