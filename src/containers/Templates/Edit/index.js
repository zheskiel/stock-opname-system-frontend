import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "../Edit/Tables/template";
import MasterTable from "../Edit/Tables/master";
import LayoutContainer from "../../Layout";

import "../../../assets/scss/templates.scss";

class TemplateEdit extends Component {
  render() {
    const { details } = this.props;
    const { data } = details;

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Template Edit - ( {data?.title} )</h2>
          </div>

          <div className="template-edit-container card-container">
            <div className="row">
              <MasterTable />
              <TemplateTable />
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.template.data,
});
const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateEdit);