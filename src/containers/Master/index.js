import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import PaginationSection from "../../sections/Pagination";
import MainSection from "../../sections/Main";

// Components
import DesktopVersion from "../../components/Master/DesktopVersion";
import MobileVersion from "../../components/Master/MobileVersion";

// Containers
import LayoutContainer from "../../containers/Layout";

// Actions
import { fetchMasterData } from "../../redux/actions";

const initialState = {
  mode: "desktop",
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

class MasterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handlePageResize = this.handlePageResize.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handlePageResize);

    new Promise((resolve) => resolve())
      .then(() => this.handlePageResize())
      .then(() => this.handleFetchData());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handlePageResize);
  }

  handlePageResize = () => {
    let windowSize = getWindowDimensions();
    let minDesktopLimit = 900;

    let terms = windowSize.width < minDesktopLimit ? "phone" : "desktop";

    this.setState({
      mode: terms,
    });
  };

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
    const { mode } = this.state;
    const { master } = this.props;

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
        <MobileVersion items={items} />
      ) : (
        <DesktopVersion items={items} />
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
