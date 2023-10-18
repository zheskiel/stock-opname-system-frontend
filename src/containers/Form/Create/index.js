import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "../Create/Tables/template";
import DetailTable from "./Tables/detail";
import LayoutContainer from "../../Layout";

// Styling
import "../../../assets/scss/templates.scss";

import { sortData, buildFormCreateFormatted } from "../../../utils/helpers";

const initialState = {
  detailArrs: [],
  detailItems: [],
  detailFitered: [],
  selectedItems: [],
  units: [],
  pageNumber: 1,
  pageSize: 15,
};

let order = 0;

class FormCreate extends Component {
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
    const { detailFitered, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;

    let currentItems = detailFitered.slice(start, end);

    // Check current page
    if (!currentItems.length > 0 && page > 1) {
      return this.handlePagination(page - 1);
    }

    this.setState({
      detailArrs: currentItems,
      pageNumber: page,
    });
  };

  handleClick = async (item, selectedUnit) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { detailItems, units } = this.state;

        let params = {
          order,
          item,
          units,
          selectedUnit,
          detailItems,
        };

        let { unitSet, result } = buildFormCreateFormatted(params);

        this.setState({
          units: unitSet,
          detailItems: result,
        });
      })
      .then(() => {
        let { detailItems } = this.state;

        let values = Object.values(detailItems);

        const sorted = sortData([...values], "order");

        this.setState({
          detailFitered: sorted,
        });
      })
      .then(() => this.handlePagination())
      .then(() => {
        let { selectedItems } = this.state;
        let newData = {
          product_code: item.product_code,
          unit: selectedUnit,
        };

        let newItems = [...[newData], ...selectedItems];

        this.setState({ selectedItems: newItems });
      });
  };

  handleRemoveAllData = async () => {
    return new Promise((resolve) => resolve()).then(() => {
      this.setState(initialState);
    });
  };

  handleRemoveData = async (item, pageNumber) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { detailItems } = this.state;

        let details = Object.values(detailItems).filter(
          (target) => target.product_id != item.product_id
        );

        let result = {};

        Object.values(details).map((item) => {
          result[item.id] = { ...item };
        });

        this.setState({ detailItems: result });
      })
      .then(() => {
        //  Remove Units from state
        const { units } = this.state;

        let filterUnit = Object.fromEntries(
          Object.entries(units).filter(([key]) => key != item.id)
        );

        this.setState({ units: filterUnit });
      })
      .then(() => {
        const { detailFitered } = this.state;

        let filteredItems = detailFitered.filter(
          (target) => target.product_id != item.product_id
        );

        this.setState({
          detailArrs: filteredItems,
          detailFitered: filteredItems,
        });
      })
      .then(() => this.handlePagination(pageNumber))
      .then(() => {
        const { selectedItems } = this.state;

        let filteredItems = selectedItems.filter(
          (target) => target.product_code != item.product_code
        );

        this.setState({ selectedItems: filteredItems });
      });
  };

  render() {
    const { detailFitered, detailArrs, selectedItems, pageNumber, pageSize } =
      this.state;

    let templateProps = {
      handleClick: this.handleClick,
      selectedItems,
      detailFitered,
      pageNumber,
    };

    let detailProps = {
      handleRemoveAllData: this.handleRemoveAllData,
      handleRemoveData: this.handleRemoveData,
      handlePagination: this.handlePagination,
      detailFitered,
      detailArrs,
      pageNumber,
      pageSize,
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Create Form</h2>
          </div>

          <div className="template-edit-container card-container pt-3">
            <div className="row">
              <TemplateTable {...templateProps} />
              <DetailTable {...detailProps} />
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
