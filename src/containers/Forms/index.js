import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../components/Loader";
import Link from "../../components/Link";

// Containers
import LayoutContainer from "../../containers/Layout";

// Sections
import MainSection from "../../sections/Main";

// Actions
import { fetchFormsData } from "../../redux/actions";

// Styling
import "../../assets/scss/templates.scss";

const initialState = {
  isReady: false,
};

class FormsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => {
          this.setState({
            isReady: true,
          });
        }, 500);
      });
  }

  handleFetchData = async (page = 1) => {
    let { fetchFormsData } = this.props;
    let params = {
      page,
    };

    fetchFormsData(params);

    window.scrollTo(0, 0);
  };

  render() {
    const { isReady } = this.state;
    const { staffData } = this.props;
    const { staff } = staffData;

    const ContentSection = () => {
      if (!staffData || !isReady) {
        return (
          <div className="table-responsive small">
            <Loader />
          </div>
        );
      }

      return (
        <div className="table-responsive small">
          <div className="table-container">
            <table className="table table-striped table-sm desktop-main-data">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Name</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {staff &&
                  Object.values(staff).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td
                          className="unit-actions"
                          style={{ verticalAlign: "middle" }}
                        >
                          <Link
                            className="btn btn-warning"
                            href={`form/${item.manager_id}/${item.id}/details`}
                          >
                            View Form
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Forms</h2>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group">
                <Link className="btn btn-warning me-2" href={`/form/create`}>
                  Create
                </Link>
              </div>
            </div>
          </div>

          <ContentSection />
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  staffData: state.forms.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFormsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormsData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormsContainer);
