// import logo from "../logo.svg";
import "../App.css";
import React from "react";
import { Switch } from "react-router-dom";
import Splash from "./Splash.jsx";
import AuthRoute from "../util/route_util.js";
import "../stylesheets/main.css";
import Main from './Main.jsx';


const App = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Splash} routeType="auth" />
      <AuthRoute exact path="/main" component={Main} />
    </Switch>
  );
};

export default App;
