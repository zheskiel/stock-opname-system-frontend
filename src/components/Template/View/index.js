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

    if (!data) return <>Loading...</>;

    const { details: items } = data;

    const arrs = [
      { title: "Product ID", key: "product_id", width: "10%" },
      { title: "Product Code", key: "product_code", width: "15%" },
      { title: "Product Name", key: "product_name", width: "30%" },
      { title: "Unit Value", key: "unit_value", width: "15%" },
      { title: "Unit Label", key: "unit_label", width: "15%" },
      { title: "Tolerance", key: "tolerance", width: "15%" },
    ];

    let params = {
      items,
      arrs,
    };

    const renderItem =
      mode == "phone" ? (
        <ViewMobile {...params} />
      ) : (
        <ViewDesktop {...params} />
      );

    return <>{renderItem}</>;
  }
}

const mapStateToProps = (state) => ({
  mode: state.viewMode.mode,
  details: state.template.data,
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateView);
