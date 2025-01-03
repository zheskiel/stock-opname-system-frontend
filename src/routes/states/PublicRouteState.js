import React from "react";

import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const PublicRouteState = ({
  component: Component,
  restricted,
  isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default compose(withRouter, connect(mapStateToProps))(PublicRouteState);
