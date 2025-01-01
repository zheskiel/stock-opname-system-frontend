import React from "react";
import { withRouter } from "react-router-dom";

// Google Analytics
import { logPageView } from "../../analytics";

class Tracker extends React.Component {
  componentDidMount() {
    this.trackPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.trackPage();
    }
  }

  trackPage() {
    const path = this.props.location.pathname + this.props.location.search;

    logPageView(path);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(Tracker);
