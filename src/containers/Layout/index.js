import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import HeaderSection from "../../sections/Header";
import SidebarSection from "../../sections/Sidebar";

// Actions
import { setViewMode } from "../../redux/actions";

// Helpers
import { calculateWindowSize } from "../../utils/helpers";

import { Helmet } from "react-helmet";

class LayoutContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePageResize = this.handlePageResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handlePageResize);

    new Promise((resolve) => resolve()).then(() => this.handlePageResize());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handlePageResize);
  }

  handlePageResize = () => {
    let { mode, setViewMode } = this.props;

    let size = calculateWindowSize();

    if (size != mode) setViewMode(size);
  };

  render() {
    const { children } = this.props;

    return (
      <>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet>

        <main>
          <HeaderSection />

          <div className="main-container container-fluid">
            <div className="row">
              <SidebarSection />

              <>{children}</>
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: state.viewMode.mode,
});
const mapDispatchToProps = (dispatch) => ({
  setViewMode: (mode) => {
    dispatch(setViewMode(mode));
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LayoutContainer);
