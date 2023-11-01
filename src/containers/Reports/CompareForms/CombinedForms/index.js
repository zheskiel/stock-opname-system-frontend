import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../../../components/Loader";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Actions
import { fetchCombinedFormsData } from "../../../../redux/actions";

// Styling
import "../../../../assets/scss/compare_combined.scss";

const initialState = {
  isMounted: false,
};

class CombinedFormsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchCombinedData = this.handleFetchCombinedData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchCombinedData())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchCombinedData = async (page = 1) => {
    let { fetchCombinedFormsData, match } = this.props;
    let parameters = {
      ...match.params,
      page,
    };

    await fetchCombinedFormsData(parameters);

    window.scrollTo(0, 0);
  };

  render() {
    const { isMounted } = this.state;

    const CombinedItems = () => {
      const { combinedFormsData } = this.props;
      const { data } = combinedFormsData;

      const { total, current_page, per_page, last_page } = combinedFormsData;
      const newProps = {
        totalCount: total,
        pageNumber: current_page,
        pageSize: per_page,
        handlePagination: this.handleFetchCombinedData,
      };

      const hasPagination = (lastPage) => {
        return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
      };

      const dataItems = data?.items.map((item, index) => {
        return (
          <div key={item.id} className="combined-container">
            <div className="combined-wrapper">
              <div className="product_index">
                {index + 1 + (current_page - 1) * per_page}
              </div>
              <input
                className="product_name"
                type="text"
                value={item.product_name}
                disabled
              />
              <input
                className="product_code"
                type="text"
                value={item.product_code}
                disabled
              />
              <input
                className="product_value"
                type="text"
                value={item.value}
                disabled
              />
              <input
                className="product_sku"
                type="text"
                value={item.unit_sku}
                disabled
              />
            </div>
          </div>
        );
      });

      return (
        <div className="combined-section">
          <div
            className={`combined-items-section ${
              last_page > 1 ? "has-pagination" : ""
            }`}
          >
            {dataItems}
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    return <>{!isMounted ? <Loader /> : <CombinedItems />}</>;
  }
}

const mapStateToProps = (state) => ({
  combinedFormsData: state.combinedForms?.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCombinedFormsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchCombinedFormsData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CombinedFormsComponent);
