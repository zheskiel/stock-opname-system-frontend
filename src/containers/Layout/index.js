import React, { Component } from "react";

import HeaderSection from "../../sections/Header";
import SidebarSection from "../../sections/Sidebar";

import { Helmet } from "react-helmet";

class LayoutContainer extends Component {
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

export default LayoutContainer;
