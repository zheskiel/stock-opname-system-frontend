import React, { Component } from "react";

// Components
import Link from "../../components/Link";

class IndexContainer extends Component {
  render() {
    return (
      <main>
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">Login</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Please Choose Login Type</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link href={`login`}>
                <button className="btn btn-info">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default IndexContainer;
