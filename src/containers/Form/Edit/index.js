import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "./Tables/template";
import DetailTable from "./Tables/detail";
import LayoutContainer from "../../Layout";

// Styling
import "../../../assets/scss/templates.scss";

class FormEdit extends Component {
  render() {
    const { details } = this.props;
    const { data } = details;

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Form Edit - {data?.staff?.name}</h4>
          </div>

          <div className="template-edit-container card-container">
            <div className="row">
              <TemplateTable />
              <DetailTable />
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.form.data,
});
const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormEdit);
