import React, { Component } from "react";
import Footer from "../../components/Footer";

import "../../assets/scss/main.scss";

class MainSection extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="main-wrapper col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="main-content">{children}</div>

        <Footer />
      </div>
    );
  }
}

export default MainSection;
