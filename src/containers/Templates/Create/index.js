import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import MasterTemplate from "../Create/Tables/master";
import TemplateTable from "../Create/Tables/template";
import LayoutContainer from "../../Layout";

// Styling
import "../../../assets/scss/templates.scss";

const initialState = {
  templateArrs: [],
  templateItems: [],
  selectedItems: [],
  pageNumber: 1,
  pageSize: 15,
};

class TemplateCreate extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleRemoveAllData = this.handleRemoveAllData.bind(this);
  }

  componentDidMount() {
    this.handlePagination();
  }

  handlePagination = (page = 1) => {
    const { templateItems, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;
    let currentItems = templateItems.slice(start, end);

    // Check current page
    if (!currentItems.length > 0 && page > 1) {
      return this.handlePagination(page - 1);
    }

    this.setState({
      templateArrs: currentItems,
      pageNumber: page,
    });
  };

  handleClick = async (item) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { templateItems } = this.state;

        let newItems = [...[item], ...templateItems];

        this.setState({ templateItems: newItems });
      })
      .then(() => this.handlePagination())
      .then(() => {
        let { templateItems } = this.state;

        let items = Object.keys(templateItems).map(
          (f) => templateItems[f].product_code
        );

        this.setState({ selectedItems: items });
      });
  };

  handleRemoveAllData = async () => {
    return new Promise((resolve) => resolve()).then(() => {
      this.setState(initialState);
    });
  };

  handleRemoveData = async (item, pageNumber) => {
    const { templateItems, selectedItems } = this.state;

    return new Promise((resolve) => resolve())
      .then(() => {
        let filteredItems = templateItems.filter((target) => {
          return target.product_id != item.product_id;
        });

        this.setState({
          templateArrs: filteredItems,
          templateItems: filteredItems,
        });
      })
      .then(() => this.handlePagination(pageNumber))
      .then(() => {
        let filteredItems = selectedItems.filter(
          (target) => target != item.product_code
        );

        this.setState({ selectedItems: filteredItems });
      });
  };

  render() {
    const { templateItems, templateArrs, selectedItems, pageNumber, pageSize } =
      this.state;

    let masterProps = {
      handleClick: this.handleClick,
      selectedItems,
      templateItems,
      pageNumber,
    };

    let templateProps = {
      handleRemoveAllData: this.handleRemoveAllData,
      handleRemoveData: this.handleRemoveData,
      handlePagination: this.handlePagination,
      templateItems,
      templateArrs,
      pageNumber,
      pageSize,
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Create Template</h4>
          </div>

          <div className="template-create-container template-edit-container card-container">
            <div className="row">
              <MasterTemplate {...masterProps} />
              <TemplateTable {...templateProps} />
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
)(TemplateCreate);
