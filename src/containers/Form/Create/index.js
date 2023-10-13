import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "../Create/Tables/template";
import LayoutContainer from "../../Layout";

// Styling
import "../../../assets/scss/templates.scss";

const initialState = {};

class FormCreate extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  render() {
    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Create Form</h2>
          </div>

          <div className="template-edit-container card-container pt-3">
            <div className="row">
              <TemplateTable />
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormCreate);
