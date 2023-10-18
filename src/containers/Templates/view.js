import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Data
import { typeFourArrs as arrs } from "../../constants/arrays";

// Components
import TemplateView from "../../components/Template/View";
import Loader from "../../components/Loader";
import Link from "../../components/Link";

// Containers
import LayoutContainer from "../Layout";

// Sections
import MainSection from "../../sections/Main";
import PaginationSection from "../../sections/Pagination";

// Actions
import { fetchTemplateViewData } from "../../redux/actions";

// Helpers
import { buildItemsObj } from "../../utils/helpers";

// Styling
import "../../assets/scss/templates.scss";

const initialState = {
  isReady: false,
  items: {},
  sort: "id",
  order: "asc",
  orderList: ["asc", "desc"],
};

class TemplatesViewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.setState({ items: buildItemsObj(arrs) }))
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => this.setState({ isReady: true }), 500);
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

        let { fetchTemplateViewData, match } = this.props;
        let { params } = match;
        let { id } = params;

        let parameters = {
          sort: sortState,
          order: orderState,
          templateId: id,
          page: page,
        };

        fetchTemplateViewData(parameters);

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
    const { isReady } = this.state;
    const { details } = this.props;
    const { total, current_page, per_page, last_page } = details;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handlePagination,
    };

    const { data: detail } = details;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const ContentSection = () => {
      if (!detail || !isReady)
        return (
          <div className="template-view-container table-responsive small">
            <Loader />
          </div>
        );

      const templateProps = {
        handleFetchData: this.handleFetchData,
        orderList: this.state.orderList,
        keyItems: this.state.items,
        currentPage: current_page,
        arrs,
      };

      return (
        <div className="template-view-section table-responsive small">
          <div className="table-container">
            <TemplateView {...templateProps} />
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">
              {detail?.title ? `${detail.title}'s Details` : <>Loading...</>}
            </h2>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group">
                <Link
                  type="button"
                  className="btn btn-sm btn-warning"
                  href={`/template/${detail?.id}/edit`}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <ContentSection />
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.template.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTemplateViewData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateViewData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplatesViewContainer);
