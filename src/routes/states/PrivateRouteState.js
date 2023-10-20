import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isEligible, isLogin } from "../../utils/helpers";

const PrivateRouteState = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogin() && isEligible(rest.name) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default PrivateRouteState;
