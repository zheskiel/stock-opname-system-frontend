import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import ViewDesktop from "./ViewDesktop";
import ViewMobile from "./ViewMobile";

class MasterView extends Component {
  render() {
    const { master, mode } = this.props;

    if (!master) return <></>;

    const { data: items } = master;

    let params = {
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
  master: state.master.data,
});

const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MasterView);
