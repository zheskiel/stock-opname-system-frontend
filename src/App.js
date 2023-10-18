import React, { Component } from "react";

import { withRouter, Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";

import { PublicRoutes, PrivateRoutes } from "./routes";
import { PublicRoute, PrivateRoute } from "./routes/states";

import "./assets/scss/app.scss";

class App extends Component {
  render() {
    return (
      <Switch>
        {PublicRoutes.map((route, index) => {
          return (
            <PublicRoute
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
              restricted={route.restricted}
            />
          );
        })}

        {PrivateRoutes.map((route, index) => {
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          );
        })}

        <Redirect to={"/"} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
