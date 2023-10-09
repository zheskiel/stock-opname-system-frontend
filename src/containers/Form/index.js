import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

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

import "../../assets/scss/templates.scss";

const initialState = {
  isReady: false,
};

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => {
          this.setState({
            isReady: true,
          });
        }, 500);
      });
  }

  handleFetchData = (page = 1) => {
    let { fetchFormDetailsData, match } = this.props;
    let params = {
      ...match.params,
      page,
    };

    fetchFormDetailsData(params);

    window.scrollTo(0, 0);
  };

  render() {
    const { isReady } = this.state;
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

    const ContentSection = () => {
      if (!isReady) {
        return (
          <div className="table-responsive small">
            <Loader />
          </div>
        );
      }

      return (
        <div className="template-view-container table-responsive small">
          <FormView />

          {hasPagination(last_page)}
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Form Details - {data?.staff?.name}</h4>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group">
                <Link
                  className="btn btn-warning me-2"
                  href={`/form/${managerId}/${staffId}/details/${data?.template_id}/edit`}
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
