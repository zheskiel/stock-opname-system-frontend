import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import ViewDesktop from "./ViewDesktop";
import ViewMobile from "./ViewMobile";

class TemplateView extends Component {
  render() {
    const { details, mode } = this.props;
    const { data } = details;

    const { details: items } = data;

    const params = {
      ...this.props,
      items,
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
  details: state.template.data,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateView);
