import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import ViewDesktop from "./ViewDesktop";
import ViewMobile from "./ViewMobile";

class FormView extends Component {
  render() {
    const { details, mode } = this.props;
    const { data } = details;

    if (!data) return <></>;

    const { items } = data;

    const arrs = [
      // { title: "ID", key: "id", width: "3%" },
      { title: "Product ID", key: "product_id", width: "10%" },
      { title: "Product Code", key: "product_code", width: "15%" },
      { title: "Product Name", key: "product_name", width: "30%" },
      { title: "Unit", key: "unit", width: "15%" },
      //   { title: "Value", key: "value", width: "15%" },
    ];

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
