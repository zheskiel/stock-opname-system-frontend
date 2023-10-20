import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../sections/Main";

// Containers
import LayoutContainer from "../Layout";

class ReportContainer extends Component {
  render() {
    return (
      <LayoutContainer>
        <MainSection>Report</MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ReportContainer);
