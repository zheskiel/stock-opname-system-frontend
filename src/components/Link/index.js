import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Link extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  getFormattedUrl = () => {
    let string = `${this.props.href}`;
    let prefix = this.hasPrefix(string) ? "" : "/";

    return `${prefix}${string}`.replace("//", "/");
  };

  hasPrefix = (string) => {
    return string.startsWith("/");
  };

  handleClick = (e) => {
    e.preventDefault();

    this.props.history.push(this.getFormattedUrl());
  };

  render() {
    const { children, ...props } = this.props;

    let newProps = {
      className: props.className,
      href: this.getFormattedUrl(),
    };

    return (
      <a {...newProps} onClick={(e) => this.handleClick(e)}>
        {children}
      </a>
    );
  }
}

export default compose(withRouter, connect(null, null))(Link);
