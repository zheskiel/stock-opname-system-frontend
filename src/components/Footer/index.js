import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="pt-3 pb-3 mt-4 text-body-secondary border-top">
        <span>© lpmlGroup</span>

        <span className="float-end">
          Develop by&nbsp;
          <a href="https://www.zheskiel.com">Zheskiel.labs</a>
        </span>
      </footer>
    );
  }
}

export default Footer;
