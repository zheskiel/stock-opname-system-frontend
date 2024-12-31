import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Array Data
import { typeFiveArrs as arrs } from "../../constants/arrays";

// Sections
import PaginationSection from "../../sections/Pagination";
import MainSection from "../../sections/Main";

// Components
import MasterView from "../../components/Master";
import Loader from "../../components/Loader";

// Containers
import LayoutContainer from "../../containers/Layout";

// Actions
import { fetchMasterData } from "../../redux/actions";

// Helpers
import { buildItemsObj } from "../../utils/helpers";

// Styling
import "../../assets/scss/master.scss";
import "../../assets/scss/templates.scss";

const initialState = {
  isMounted: false,
  isReady: false,
  items: {},
  sort: "id",
  order: "asc",
  orderList: ["asc", "desc"],
};

class MasterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.setState({ items: buildItemsObj(arrs) }))
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchData = async (
    page = 1,
    sort = "product_name",
    order = "asc",
    isDesc = false
  ) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { items } = this.state;

        this.setState({ sort, order, isDesc });
        this.setState({
          items: {
            ...items,
            [sort]: {
              sort,
              order,
              isDesc,
            },
          },
        });
      })
      .then(() => {
        let { items } = this.state;
        let { sort: sortState, order: orderState } = items[sort];

        let { fetchMasterData, match } = this.props;
        let params = {
          ...match.params,
          sort: sortState,
          order: orderState,
          page,
        };

        fetchMasterData(params);

        window.scrollTo(0, 0);
      });
  };

  handlePagination = async (page) => {
    return new Promise((resolve) => resolve()).then(() => {
      let { sort, order, isDesc } = this.state;

      this.handleFetchData(page, sort, order, isDesc);
    });
  };

  render() {
    const { isMounted } = this.state;
    const { master } = this.props;
    const { data } = master;

    const { total, current_page, per_page, last_page } = data;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handlePagination,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const ContentSection = () => {
      if (!master || !isMounted) {
        return (
          <div className="table-responsive small">
            <Loader />
          </div>
        );
      }

      const masterProps = {
        handleFetchData: this.handleFetchData,
        orderList: this.state.orderList,
        keyItems: this.state.items,
        currentPage: current_page,
        arrs,
      };

      return (
        <div className="template-view-section table-responsive small">
          <div className="table-container">
            <MasterView {...masterProps} />
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Master Product</h4>
          </div>

          <ContentSection />
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  master: state.master,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMasterData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchMasterData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MasterContainer);
