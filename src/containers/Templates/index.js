import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../components/Loader";
import Link from "../../components/Link";

// Containers
import LayoutContainer from "../Layout";

// Sections
import PaginationSection from "../../sections/Pagination";
import MainSection from "../../sections/Main";

// Actions
import { fetchTemplatesData } from "../../redux/actions";

import "../../assets/scss/templates.scss";

const initialState = {
  isMounted: false,
  templates: [],
};

class TemplatesContainer extends Component {
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

  handleFetchData = async (page = 1) => {
    let { fetchTemplatesData, templates } = this.props;
    let { current_page } = templates;

    // Dont do fetch, when user at the same page
    if (page == current_page) return;

    let params = {
      page,
    };

    fetchTemplatesData(params);

    window.scrollTo(0, 0);
  };

  render() {
    const { isMounted } = this.state;
    const { templates } = this.props;
    const { data: items } = templates;

    const { total, current_page, per_page, last_page } = templates;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const ContentSection = () => {
      if (!items || !isMounted)
        return (
          <div className="templates-container card-container">
            <Loader />
          </div>
        );

      return (
        <div className="templates-container card-container">
          <div className="row">
            {items &&
              items.map((item) => {
                return (
                  <div className="col-sm-6 mb-3" key={item.id}>
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">{item.title}</h6>
                        <p className="templates-text card-text">
                          Status: Published
                          <span className="templates-status position-absolute p-2 bg-success border border-light rounded-circle">
                            <span className="visually-hidden"></span>
                          </span>
                          <span className="float-end">
                            Total items: {item.details_count}
                          </span>
                        </p>

                        <Link
                          className="btn btn-primary me-2"
                          href={`/template/${item.id}/view`}
                        >
                          View
                        </Link>

                        <Link
                          className="btn btn-warning me-2"
                          href={`/template/${item.id}/edit`}
                        >
                          Edit
                        </Link>

                        <a href="#" className="btn btn-danger me">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Templates</h2>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group">
                <Link className="btn btn-sm btn-info" href={`/template/create`}>
                  Create
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
  templates: state.templates.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTemplatesData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplatesData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplatesContainer);
