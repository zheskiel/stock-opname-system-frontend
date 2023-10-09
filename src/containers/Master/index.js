import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

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

// Styling
import "../../assets/scss/master.scss";

const initialState = {
  isReady: false,
};

class MasterContainer extends Component {
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

  handleFetchData = async (page = 1) => {
    let { fetchMasterData, master } = this.props;
    let { current_page } = master;

    // Dont do fetch, when user at the same page
    if (page == current_page) return;

    let params = {
      page,
    };

    fetchMasterData(params);

    window.scrollTo(0, 0);
  };

  render() {
    const { isReady } = this.state;
    const { master } = this.props;

    const { total, current_page, per_page, last_page } = master;
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
      if (!master || !isReady) {
        return (
          <div className="table-responsive small">
            <Loader />
          </div>
        );
      }

      return (
        <div className="table-responsive small">
          <MasterView />
          <br />

          {hasPagination(last_page)}
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Master Product</h2>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-warning">
                  Edit
                </button>
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
  master: state.master.data,
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
