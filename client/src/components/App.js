import logo from "../logo.svg";
import "../App.css";
import React, { Component } from "react";
import { Query } from "react-apollo";
import { Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Nav from "./Nav.js";
import Splash from "./Splash.jsx";
import Register from "./Register.js";
import AuthRoute from "../util/route_util.js";
import '../stylesheets/main.scss';

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
        <Route exact path="/" component={Splash} />
      </Switch>
    </div>
  );
};

export default App;
