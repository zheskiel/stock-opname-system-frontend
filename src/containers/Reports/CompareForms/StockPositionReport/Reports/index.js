import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../../../../components/Loader";
import StockPositionUpload from "../Upload";

// Sections
import PaginationSection from "../../../../../sections/Pagination";

// Actions
import { fetchStockPosition } from "../../../../../redux/actions";

// Styling
import "../../../../../assets/scss/compare_stock_position.scss";

const initialState = {
  isMounted: false,
};

class StockPositionReports extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchData = (page = 1, withLoad = false) => {
    new Promise((resolve) => resolve())
      .then(() => (withLoad ? this.setState({ isMounted: false }) : null))
      .then(async () => {
        let { fetchStockPosition } = this.props;
        let parameters = {
          page,
        };

        await fetchStockPosition(parameters);

        // window.scrollTo(0, 0);
      })
      .then(() =>
        withLoad
          ? setTimeout(() => this.setState({ isMounted: true }), 500)
          : null
      );
  };

  render() {
    const { isMounted } = this.state;
    const ContentItems = () => {
      const { stockPositionData } = this.props;
      const { data } = stockPositionData;

      const { total, current_page, per_page, last_page } = stockPositionData;
      const newProps = {
        totalCount: total,
        pageNumber: current_page,
        pageSize: per_page,
        handlePagination: this.handleFetchData,
      };

      const hasPagination = (lastPage) => {
        return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
      };

      if (!data.length > 0) {
        let page = 1;
        let withLoad = true;

        return (
          <StockPositionUpload
            fetchData={() => this.handleFetchData(page, withLoad)}
          />
        );
      }

      const dataItems =
        data &&
        data?.map((item, index) => {
          return (
            <div key={item.id} className="stock-position-container">
              <div className="stock-position-wrapper">
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
                  value={item.unit}
                  disabled
                />
              </div>
            </div>
          );
        });

      return (
        <div className="stock-position-section">
          <div
            className={`stock-position-items-section  ${
              last_page > 1 ? "has-pagination" : ""
            }`}
          >
            {dataItems}
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    return !isMounted ? <Loader /> : <ContentItems />;
  }
}

const mapStateToProps = (state) => ({
  stockPositionData: state.stockPosition?.data,
});
const mapDispatchToProps = (dispatch) => ({
  fetchStockPosition: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchStockPosition(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(StockPositionReports);
