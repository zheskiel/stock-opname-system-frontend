import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Actions
import { AuthLogout } from "../../redux/actions/auth";

// Components
import Link from "../../components/Link";

import "../../assets/scss/header.scss";

class HeaderSection extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin = (e) => {
    e.preventDefault();

    const { history } = this.props;

    history.push("/login");
  };

  handleLogout = (e) => {
    e.preventDefault();

    const { AuthLogout, history } = this.props;

    return new Promise((resolve) => {
      AuthLogout();
      resolve();
    }).then(() => {
      history.push("/");
    });
  };

  render() {
    const { isAuth, user } = this.props;

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid" style={{ position: "relative" }}>
            <a className="navbar-brand" href="#">
              Stock Opname
            </a>

            <button
              className={`navbar-toggler collapsed ${
                isAuth ? "auth" : "non-auth"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link active" href={`/`}>
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            {isAuth ? (
              <>
                <div className="user-information">
                  <div>{user.email}</div>
                  <div>{user.role}</div>
                </div>

                <div className="user-profile flex-shrink-0 dropdown">
                  <a
                    href="#"
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu text-small shadow">
                    <li
                      style={{ padding: "0.25rem 1rem", whiteSpace: "nowrap" }}
                    >
                      {user.email}
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={this.handleLogout}>
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="login-temp">
                <button className="btn btn-info" onClick={this.handleLogin}>
                  Login
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
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
)(HeaderSection);
