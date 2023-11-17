import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../../components/Loader";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import LayoutContainer from "../../Layout";
import TestingFormItems from "./items";

// Actions
import { fetchStaffFormData, fetchOutletData } from "../../../redux/actions";

// Helpers
import { formatDate } from "../../../utils/helpers";

// Styling
import "../../../assets/scss/testing_forms.scss";

const initialState = {
  isMounted: false,
  currentOutlet: 1,
  currentManager: 1,
};

class TestingForms extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleFetchOutletData = this.handleFetchOutletData.bind(this);
  }

  componentDidMount() {
    let isMounted = true; // Track the mounted status

    new Promise((resolve) => resolve())
      .then(() => this.handleFetchOutletData())
      .then(() => {
        if (isMounted) {
          // Check if the component is still mounted
          setTimeout(() => this.setState({ isMounted: true }), 500);
        }
      });

    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }

  handleFetchOutletData = () => {
    new Promise((resolve) => resolve())
      .then(async () => {
        const { fetchOutletData } = this.props;

        await fetchOutletData().then(() => {
          const { testingOutlet } = this.props;

          this.setState({
            currentManager: testingOutlet[0].manager.id,
          });
        });
      })
      .then(() => this.handleFetchData());
  };

  processFetching = (outletId, managerId) => {
    new Promise((resolve) => resolve()).then(async () => {
      const { fetchStaffFormData } = this.props;

      let params = {
        outletId,
        managerId,
      };

      await fetchStaffFormData(params);
    });
  };

  handleFetchData = () => {
    const { currentManager, currentOutlet } = this.state;

    this.processFetching(currentOutlet, currentManager);
  };

  handleChange = (outletId, managerId) => {
    new Promise((resolve) => resolve())
      .then(() => this.processFetching(outletId, managerId))
      .then(() => {
        let container = document.querySelector(".card-containers");

        container.scrollLeft = 0;
      });
  };

  handleChangeManager = (e) => {
    let target = e.target;
    let managerId = target.value;

    let outletId = target.selectedOptions[0].dataset.outlet;

    let { currentManager, currentOutlet } = this.state;

    // Do nothing when manager id is the same
    if (managerId !== currentManager || outletId !== currentOutlet) {
      this.setState(
        {
          currentManager: managerId,
          currentOutlet: outletId,
        },
        () => {
          this.handleChange(outletId, managerId);
        }
      );
    }
  };

  render() {
    const { isMounted, currentOutlet, currentManager } = this.state;
    const { testingStaffForms, testingOutlet } = this.props;
    const { staff } = testingStaffForms;

    let date = new Date();
    let today = formatDate(date);

    const ContentItems = (
      <div className="card-containers">
        {staff &&
          staff.map((item) => (
            <div key={item.id} className="card-wrapper">
              <h5 className="card-title">
                {item.id} - {item.name}
              </h5>

              <div className="card">
                <div className="card-body pt-0 pb-0">
                  <TestingFormItems
                    key={`${currentOutlet}-${currentManager}-${item.id}`}
                    managerId={currentManager}
                    staffId={item.id}
                    date={today}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    );

    return (
      <LayoutContainer>
        <MainSection>
          <div className="testing-container d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4 mb-0">Testing Forms Submit</h4>

            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="me-2">
                <h6 className="mb-0">Date : {today}</h6>
              </div>
              <div className="me-2">
                <h6 className="mb-0">|</h6>
              </div>
              <div className="me-2">
                <h6 className="mb-0">Select Outlet & Manager :</h6>
              </div>
              <select
                className="me-2"
                onChange={(e) => this.handleChangeManager(e)}
                defaultValue={currentManager}
              >
                {testingOutlet &&
                  testingOutlet.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.manager.id}
                        data-outlet={item.id}
                      >
                        {item.name} - {item.manager.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <>{!isMounted && !staff ? <Loader /> : ContentItems}</>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  testingOutlet: state.testingOutlet.data,
  testingStaffForms: state.testingStaffForms.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaffFormData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchStaffFormData(params)).then(() => resolve());
    });
  },
  fetchOutletData: () => {
    return new Promise((resolve) => {
      dispatch(fetchOutletData()).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TestingForms);
