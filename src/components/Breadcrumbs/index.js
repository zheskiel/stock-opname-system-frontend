import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { PrivateRoutes as routes } from "../../routes/index";

import Link from "../Link";

class BreadCrumbs extends Component {
  render() {
    const { match } = this.props;
    const { path: routePath } = match;

    const route = routes.filter(({ path }) => routePath.includes(path));
    const routeName = route[0]?.name.replace(".", " / ");

    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb pt-1 mb-0">
          <li className="breadcrumb-item">
            <Link href="dashboard">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {routeName}
          </li>
        </ol>
      </nav>
    );
  }
}

export default compose(withRouter)(BreadCrumbs);
