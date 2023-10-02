import React, { Component } from "react";

import HeaderSection from "../../sections/Header";
import SidebarSection from "../../sections/Sidebar";

class LayoutContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <main>
        <HeaderSection />

        <div className="main-container container-fluid">
          <div className="row">
            <SidebarSection />

            <>{children}</>
          </div>
        </div>
      </main>
    );
  }
}

export default LayoutContainer;
