import React, { Component } from "react";

import { Puff } from "react-loading-icons";

class Loader extends Component {
  render() {
    return (
      <div className="loading-container fullsize">
        <Puff stroke="#000" strokeOpacity={0.5} speed={0.75} />
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loader;
