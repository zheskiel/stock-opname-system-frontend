import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import PaginationSection from "../../sections/Pagination";
import MainSection from "../../sections/Main";

// Components
import DesktopView from "../../components/Master/DesktopView";
import MobileView from "../../components/Master/MobileView";

// Containers
import LayoutContainer from "../../containers/Layout";

// Actions
import { fetchMasterData } from "../../redux/actions";

// Styling
import "../../assets/scss/master.scss";

class MasterContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve()).then(() => this.handleFetchData());
  }

  handleFetchData = async (page = 1) => {
    let { master } = this.props;
    let { current_page } = master;

    // Dont do fetch, when user at the same page
    if (page == current_page) return;

    let params = {
      page,
    };

    this.props.fetchMasterData(params);

    window.scrollTo(0, 0);
  };

  render() {
    const { master, mode } = this.props;
    const { data: items } = master;

    const { total, current_page, per_page } = master;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const renderItem =
      mode == "phone" ? (
        <MobileView items={items} />
      ) : (
        <DesktopView items={items} />
      );

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

          <div className="table-responsive small">
            {renderItem}
            <br />

            <PaginationSection {...newProps} />
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: state.viewMode.mode,
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