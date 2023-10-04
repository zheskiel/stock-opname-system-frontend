import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Link extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  hasPrefix = () => {
    let prefix = `/`;
    let hasPrefix = `${prefix !== "undefined" ? prefix : ""}`;

    return hasPrefix;
  };

  handleClick = (e) => {
    e.preventDefault();

    let url = `${this.props.href}`;

    this.props.history.push(url);
  };

  render() {
    const { children, ...props } = this.props;

    let newProps = {
      className: props.className,
      href: `${this.hasPrefix()}${props.href}`,
    };

    return (
      <a {...newProps} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default compose(withRouter, connect(null, null))(Link);
