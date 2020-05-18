import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authenticate } from "../functions/auth";

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
