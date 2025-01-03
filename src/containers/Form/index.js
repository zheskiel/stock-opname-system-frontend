import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Data Array
import { typeThreeArrs as arrs } from "../../constants/arrays";

// Components
import FormView from "../../components/Form/View";
import Loader from "../../components/Loader";
import Link from "../../components/Link";

// Containers
import LayoutContainer from "../../containers/Layout";

// Sections
import PaginationSection from "../../sections/Pagination";
import MainSection from "../../sections/Main";

// Actions
import { fetchFormDetailsData } from "../../redux/actions";

// Helpers
import { buildItemsObj, buildLinkUrl } from "../../utils/helpers";

// Styling
import "../../assets/scss/templates.scss";

const initialState = {
  isMounted: false,
  items: {},
  sort: "id",
  order: "asc",
  orderList: ["asc", "desc"],
};

class FormContainer extends Component {
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
    sort = "id",
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

        let { fetchFormDetailsData, match } = this.props;
        let params = {
          ...match.params,
          sort: sortState,
          order: orderState,
          withLimit: 1,
          page,
        };

        fetchFormDetailsData(params);
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
    const { details, match } = this.props;
    const { params } = match;

    const { managerId, staffId } = params;

    const { total, current_page, per_page, last_page } = details;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const { data } = details;

    if (!data) return contentLoader;

    const ContentSection = () => {
      const formProps = {
        handleFetchData: this.handleFetchData,
        orderList: this.state.orderList,
        keyItems: this.state.items,
        currentPage: current_page,
        arrs,
      };

      return (
        <div className="template-view-section table-responsive small">
          <div className="table-container">
            <FormView {...formProps} />
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    let urlName = `form.edit`;
    let { linkParams, eligible } = buildLinkUrl(urlName, [
      managerId,
      staffId,
      data.template_id,
    ]);

    let contentLoader = (
      <div className="table-responsive small">
        <Loader />
      </div>
    );

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Form Details - {data?.staff.name}</h4>

            {eligible && (
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group">
                  <Link className="btn btn-warning me-2" href={linkParams.url}>
                    Edit
                  </Link>
                </div>
              </div>
            )}
          </div>

          {!isMounted ? contentLoader : <ContentSection />}
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.form.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFormDetailsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormDetailsData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormContainer);
