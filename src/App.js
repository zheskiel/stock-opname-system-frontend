import React, { Component } from "react";

import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";

import { hierarchyApi } from "./apis";

class App extends Component {
  componentDidMount() {
    hierarchyApi();
  }

  render() {
    return <>Welcome!!!</>;
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
