import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import ViewDesktop from "./ViewDesktop";
import ViewMobile from "./ViewMobile";

import { typeThreeArrs as arrs } from "../../../constants/arrays";

class FormView extends Component {
  render() {
    const { details, mode } = this.props;
    const { data } = details;

    if (!data) return <></>;

    const { items } = data;

    let params = {
      items,
      arrs,
    };

    let entities = {
      mobile: ViewMobile,
      desktop: ViewDesktop,
    };

    let Entity = mode == "phone" ? entities.mobile : entities.desktop;

    return <Entity {...params} />;
  }
}

const mapStateToProps = (state) => ({
  mode: state.viewMode.mode,
  details: state.form.data,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormView);
