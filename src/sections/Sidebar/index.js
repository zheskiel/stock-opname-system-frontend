import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Actions
import { AuthLogout } from "../../redux/actions";

// Components
import Link from "../../components/Link";

// Helpers
import { isEligible } from "../../utils/helpers";

// Config
import { sideBarRoutes } from "../../utils/config";

class SidebarSection extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async (e) => {
    e.preventDefault();

    const { AuthLogout, history } = this.props;

    return new Promise((resolve) => {
      AuthLogout();
      resolve();
    }).then(() => history.push("/"));
  };

  render() {
    let RouteFormatted = () => {
      return sideBarRoutes.map((route, index) => {
        let RouteOption =
          typeof route.children !== "undefined" ? RouteChildren : RouteDefault;

        return isEligible(route.name) ? (
          <RouteOption key={index} route={route} />
        ) : null;
      });
    };

    let RouteDefault = ({ route }) => {
      return (
        <li className="nav-item">
          <Link
            className="nav-link d-flex align-items-center gap-2"
            href={`${route.url}`}
          >
            {route.content}
          </Link>
        </li>
      );
    };

    let RouteChildren = ({ route }) => {
      let items = route.children;

      return (
        <li className="nav-item accordion accordion-flush">
          <div className="accordion-item">
            <a
              className="nav-link d-flex align-items-center gap-2 accordion-button collapsed"
              data-bs-toggle="collapse"
              data-bs-target={`#${route.name}-collapse`}
              aria-controls={`${route.name}-collapse`}
              aria-expanded="false"
            >
              {route.content}
            </a>

            {items && (
              <div
                id={`${route.name}-collapse`}
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
              >
                <ul>
                  {items.map((item, index) => {
                    return isEligible(item.name) ? (
                      <RouteDefault key={index} route={item} />
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </li>
      );
    };

    return (
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0">
        <div
          className="offcanvas-md offcanvas-end"
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">
              Company name
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3">
            <ul className="nav flex-column">
              <RouteFormatted />
            </ul>

            <hr className="my-3" />

            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Settings
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  onClick={this.handleLogout}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.data.user,
});

const mapDispatchToProps = (dispatch) => ({
  AuthLogout: () => {
    dispatch(AuthLogout());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarSection);
