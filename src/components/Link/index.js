import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Link extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();

    let url = `/${this.props.href}`;
    let formattedUrl = url.replace("//", "/");

    this.props.history.push(formattedUrl);
  };

  render() {
    const { children, ...props } = this.props;

    let newProps = {
      className: props.className,
      href: `/${props.href}`,
    };

    return (
      <a {...newProps} onClick={(e) => this.handleClick(e)}>
        {children}
      </a>
    );
  }
}

export default compose(withRouter, connect(null, null))(Link);
