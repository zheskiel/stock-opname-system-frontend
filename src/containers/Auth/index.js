import React, { Component } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  AuthLogin,
  AuthResetMessage,
  ClearLoadingStates,
} from "../../redux/actions";

import Footer from "../../components/Footer";

import "../../assets/scss/auth.scss";

const userTypes = ["staff", "manager", "admin"];
const initialState = {
  email: "admin1@gmail.com",
  password: "test123",
  type: "admin",
  error: "",
  passMode: "password",
};

class AuthContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleTogglePasswd = this.handleTogglePasswd.bind(this);
  }

  componentDidMount() {
    this.props.ClearLoadingStates();

    document.body.classList.add(
      "justify-content-center",
      "align-items-center",
      "bg-body-tertiary",
      "d-flex",
      "py-4"
    );
  }

  componentWillUnmount() {
    document.body.classList.remove(
      "justify-content-center",
      "align-items-center",
      "bg-body-tertiary",
      "d-flex",
      "py-4"
    );
  }

  handleTogglePasswd = () => {
    const target = document.getElementById("password");

    const type =
      target.getAttribute("type") === "password" ? "text" : "password";

    target.setAttribute("type", type);

    this.setState({
      passMode: type,
    });
  };

  handleChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const name = target.name;
    const value = target.value;

    let params = {
      [name]: value,
      error: "",
    };

    this.props.AuthResetMessage();

    this.setState(params);
  };

  checkSubmit = (result = false) => {
    const { email, password } = this.state;

    if ((email && password) != "") {
      result = true;
    }

    return result;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.checkSubmit()) {
      const { email, password, type } = this.state;
      const { AuthLogin } = this.props;

      return new Promise(async (resolve) => {
        await AuthLogin(email, password, type);
        resolve();
      });
    } else {
      this.setState({
        error: "Both email and password are required",
      });
    }
  };

  handleType = (e) => {
    const target = e.target;
    const name = target.name;

    let params = {
      type: name,
    };

    this.setState(params);
  };

  handleClear = () => {
    this.setState(initialState);
  };

  render() {
    const { loading, message = "" } = this.props;
    const { email, password, error, passMode, type } = this.state;

    const hasError = error || message;
    const erroMessage = error || message;

    return (
      <main className="auth-form form-signin m-auto">
        <h1 className="h3 mb-3 fw-normal text-center">Stock Opname System</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="name@example.com"
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating password-section">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />

          <div className="password-mode">
            {passMode == "password" ? (
              <FaEye onClick={this.handleTogglePasswd} />
            ) : (
              <FaEyeSlash onClick={this.handleTogglePasswd} />
            )}
          </div>

          <label htmlFor="password">Password</label>
        </div>

        <div className="auth-user-type">
          {userTypes.map((userType, index) => {
            return (
              <div className="auth-type" key={index}>
                <input
                  className="auth-checkbox"
                  name={`${userType}`}
                  type="checkbox"
                  onChange={this.handleType}
                  checked={type == userType}
                />
                <label htmlFor={`${userType}`}>{userType}</label>
              </div>
            );
          })}
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          onClick={this.handleSubmit}
        >
          Sign in
        </button>

        <Footer />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ClearLoadingStates: () => {
    dispatch(ClearLoadingStates());
  },
  AuthLogin: (email, password, type) => {
    dispatch(AuthLogin(email, password, type));
  },
  AuthResetMessage: () => {
    dispatch(AuthResetMessage());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AuthContainer);
