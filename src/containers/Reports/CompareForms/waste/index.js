import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../../../components/Loader";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Actions
import { fetchCompareWaste } from "../../../../redux/actions";

// Styling
import "../../../../assets/scss/compare_stock_waste.scss";

const initialState = {
  isMounted: false,
  itemList: [],
  itemArrs: [],
  pageNumber: 1,
  pageSize: 15,
};

class WasteReport extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    let isMounted = true; // Track the mounted status

    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => {
          const { wasteData } = this.props;
          const { items } = wasteData;

          this.setState({
            itemArrs: items,
            itemList: items,
          });
        }, 500);
      })
      .then(() => setTimeout(() => this.handlePagination(), 500))
      .then(() => {
        isMounted
          ? setTimeout(() => this.setState({ isMounted: true }), 500)
          : null;
      });

    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }

  handlePagination = (page = 1) => {
    const { itemList, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;

    let currentItems = itemList?.slice(start, end);

    this.setState({
      itemArrs: currentItems,
      pageNumber: page,
    });
  };

  handleFetchData = (page = 1, templateId = 1) => {
    new Promise((resolve) => resolve()).then(async () => {
      let { fetchCompareWaste } = this.props;
      let parameters = {
        templateId,
        page,
      };

      await fetchCompareWaste(parameters);

      // window.scrollTo(0, 0);
    });
  };

  render() {
    const { isMounted } = this.state;

    const ContentItems = () => {
      const { itemList, itemArrs, pageNumber, pageSize } = this.state;
      const last_page = Math.ceil(itemList?.length / pageSize);

      const newProps = {
        totalCount: itemList?.length,
        pageNumber: pageNumber,
        pageSize: pageSize,
        handlePagination: this.handlePagination,
      };

      const hasPagination = (lastPage) => {
        return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
      };

      const dataItems =
        itemArrs &&
        itemArrs.map((item, index) => {
          return (
            <div key={index + item.code} className="stock-waste-container">
              <div className="stock-waste-wrapper">
                <div className="product_index">
                  {index + 1 + (pageNumber - 1) * pageSize}
                </div>
                <input
                  className="product_name"
                  type="text"
                  value={item.name}
                  disabled
                />
                <input
                  className="product_code"
                  type="text"
                  value={item.code}
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
        <div className="stock-waste-section">
          <div
            className={`stock-waste-items-section ${
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
  wasteData: state.compareWaste.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompareWaste: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchCompareWaste(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(WasteReport);
