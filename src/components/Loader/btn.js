import React, { Component } from "react";

import { Puff } from "react-loading-icons";

class BtnLoader extends Component {
  render() {
    return (
      <button className="btn btn-primary btn-loading-container" disabled>
        <Puff stroke="#000" strokeOpacity={0.5} speed={0.75} />
      </button>
    );
  }
}

export default BtnLoader;
