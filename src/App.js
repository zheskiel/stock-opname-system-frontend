import React, { Component } from "react";

import { withRouter, Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";

import { PublicRoutes, PrivateRoutes } from "./routes";
import { PublicRouteState, PrivateRouteState } from "./routes/states";

// Tracking GA
import { initGA } from "./analytics";

// Styles
import "./assets/scss/app.scss";

class App extends Component {
  constructor(props) {
    super(props);

    initGA(); // Initialize Google Analytics
  }

  render() {
    return (
      <Switch>
        {PublicRoutes.map((route, index) => {
          return (
            <PublicRouteState
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
            <PrivateRouteState
              key={index}
              name={route.name}
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
