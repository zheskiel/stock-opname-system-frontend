import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

class TitleUpdater extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <Helmet>
        <title>{`Stockopname App: ${location.pathname}`}</title>
      </Helmet>
    );
  }
}

export default withRouter(TitleUpdater);
