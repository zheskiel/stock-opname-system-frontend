import React, { Component } from "react";

import LayoutContainer from "../Layout";

class DashboardContainer extends Component {
  render() {
    return (
      <LayoutContainer>
        <div className="main-content col-md-9 ms-sm-auto col-lg-10 px-md-4 pb-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Dashboard Section</h2>
          </div>
        </div>
      </LayoutContainer>
    );
  }
}

export default DashboardContainer;
