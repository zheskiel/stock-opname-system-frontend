import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import TemplateView from "../../components/Template/View";

// Containers
import LayoutContainer from "../Layout";

// Sections
import MainSection from "../../sections/Main";
import PaginationSection from "../../sections/Pagination";

// Actions
import { fetchTemplateViewData } from "../../redux/actions";

// Styling
import "../../assets/scss/templates.scss";
import Link from "../../components/Link";

class TemplatesViewContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve()).then(() => this.handleFetchData());
  }

  handleFetchData = (page = 1) => {
    const { fetchTemplateViewData, match } = this.props;
    const { params } = match;
    const { id } = params;

    let parameters = {
      templateId: id,
      page: page,
    };

    fetchTemplateViewData(parameters);

    window.scrollTo(0, 0);
  };

  render() {
    const { details } = this.props;
    const { total, current_page, per_page, last_page } = details;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const { data: detail } = details;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? (
        <>
          <br />

          <PaginationSection {...newProps} />
        </>
      ) : null;
    };

    if (!detail) return <>Loading...</>;

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">{detail.title}'s Details</h2>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group">
                <Link
                  type="button"
                  className="btn btn-sm btn-warning"
                  href={`/template/${detail.id}/edit`}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="table-responsive small">
            <TemplateView />

            {hasPagination(last_page)}
          </div>
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
