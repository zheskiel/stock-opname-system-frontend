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

    if (!master) return <>Loading...</>;

    const { data: items } = master;

    const arrs = [
      { title: "ID", key: "id", width: "3%" },
      { title: "Product ID", key: "product_id", width: "5%" },
      { title: "Category", key: "category", width: "20%" },
      { title: "Category Type", key: "category_type", width: "10%" },
      { title: "Sub Category", key: "subcategory", width: "15%" },
      { title: "Units", key: "units", width: "15%" },
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
  master: state.master.data,
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MasterView);
