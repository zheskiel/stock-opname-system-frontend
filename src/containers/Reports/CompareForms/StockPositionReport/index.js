import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../../../components/Loader";
import StockPostionReports from "./Reports";

const initialState = {
  isMounted: false,
};

class StockPositionReport extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    let isMounted = true; // Track the mounted status

    new Promise((resolve) => resolve()).then(() => {
      isMounted
        ? setTimeout(() => this.setState({ isMounted: true }), 500)
        : null;
    });

    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }

  render() {
    const { isMounted } = this.state;

    return !isMounted ? <Loader /> : <StockPostionReports />;
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(StockPositionReport);
