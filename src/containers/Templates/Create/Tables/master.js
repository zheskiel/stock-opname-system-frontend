import React, { Component } from "react";

import MasterTableCommon from "../../Common/Tables/master";

class MasterTable extends Component {
  render() {
    return <MasterTableCommon mode="create" {...this.props} />;
  }
}

export default MasterTable;
