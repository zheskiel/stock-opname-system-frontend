import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Link from "../../components/Link";

// Containers
import LayoutContainer from "../Layout";

// Sections
import MainSection from "../../sections/Main";

// Actions
import { fetchTemplatesData } from "../../redux/actions";

import "../../assets/scss/templates.scss";

const initialState = {
  templates: [],
};

class TemplatesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    this.props.fetchTemplatesData();
  }

  render() {
    const { templates } = this.props;

    if (!templates) return <>Loading...</>;

    const { data: items } = templates;

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Templates</h2>
          </div>

          <div className="templates-container card-container">
            <div className="row">
              {items &&
                items.map((item) => {
                  return (
                    <div className="col-sm-6 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="templates-text card-text">
                            Status: Published
                            <span className="templates-status position-absolute top-0 p-2 bg-success border border-light rounded-circle">
                              <span className="visually-hidden">
                                New alerts
                              </span>
                            </span>
                          </p>

                          <Link
                            className="btn btn-primary me-2"
                            href={`/template/${item.id}/view`}
                          >
                            View
                          </Link>

                          <a href="#" className="btn btn-warning me-2">
                            Edit
                          </a>
                          <a href="#" className="btn btn-danger me">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTemplatesData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplatesData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplatesContainer);
