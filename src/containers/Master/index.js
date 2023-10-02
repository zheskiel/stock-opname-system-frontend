import React, { Component } from "react";

import MainSection from "../../sections/Main";

import LayoutContainer from "../Layout";

class MasterContainer extends Component {
  render() {
    return (
      <LayoutContainer>
        <MainSection />
      </LayoutContainer>
    );
  }
}

export default MasterContainer;
