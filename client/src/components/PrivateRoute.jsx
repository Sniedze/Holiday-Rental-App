import React from "react";
import { Redirect, Route } from "react-router-dom";

export default ({ component: Component, isAuth }) => (
  <Route
    render={props => (isAuth ? <Component {...props} /> : <Redirect to="/" />)}
  />
);
