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

//  Apis
import {
  fetchManagersApi,
  fetchOutletByManagerApi,
  fetchSupervisorByManagerApi,
} from "../../apis";

// Actions
import { fetchFormsData } from "../../redux/actions";

// Helpers
import {
  buildLinkUrl,
  isAdministrator,
  isManagerial,
  isSupervisor,
  isManager,
} from "../../utils/helpers";

// Styling
import "../../assets/scss/templates.scss";

const initialState = {
  isMounted: false,
  managerItems: [],
  outletItems: [],
  supervisorItems: [],
  selectedManager: undefined,
  selectedOutlet: undefined,
  selectedSupervisor: undefined,
};

class FormsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleFetchOutlet = this.handleFetchOutlet.bind(this);
    this.handleFetchManager = this.handleFetchManager.bind(this);
    this.handleFetchSupervisor = this.handleFetchSupervisor.bind(this);

    this.handleOutletChange = this.handleOutletChange.bind(this);
    this.handleManagerChange = this.handleManagerChange.bind(this);
    this.handleSupervisorChange = this.handleSupervisorChange.bind(this);
    this.handleFormCreateByStaff = this.handleFormCreateByStaff.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => {
        if (isAdministrator()) {
          this.handleFetchManager();
        } else if (isManager()) {
          let { auth } = this.props;
          let { user } = auth;

          this.setState(
            {
              selectedManager: user.id,
            },
            () => this.handleFetchOutlet(user.id)
          );
        } else if (isSupervisor()) {
          this.handleFetchData();
        }
      })
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchManager = () => {
    fetchManagersApi()
      .then((response) => response)
      .then((result) => {
        this.setState(
          {
            managerItems: result.data,
          },
          () => {
            let managerItem = result.data[0];

            if (managerItem) {
              let managerId = managerItem.id;
              this.setState({ selectedManager: managerId });
              this.handleFetchOutlet(managerId);
            }
          }
        );
      });
  };

  handleFetchOutlet = (managerId) => {
    fetchOutletByManagerApi(managerId)
      .then((response) => response)
      .then((result) => {
        this.setState(
          {
            outletItems: result.data,
          },
          () => {
            let outletItem = result.data[0];

            if (outletItem) {
              let outletId = outletItem.id;
              this.setState({ selectedOutlet: outletId });
              this.handleFetchSupervisor(managerId, outletId);
            }
          }
        );
      });
  };

  handleFetchSupervisor = (managerId, outletId) => {
    fetchSupervisorByManagerApi(managerId, outletId)
      .then((response) => response)
      .then((result) => {
        this.setState({ supervisorItems: result.data.supervisor }, () => {
          if (result.data.supervisor) {
            let svItem = result.data.supervisor[0];

            if (svItem) {
              let supervisorId = svItem.id;
              this.setState({ selectedSupervisor: supervisorId }, () =>
                this.handleFetchData()
              );
            }
          }
        });
      });
  };

  handleManagerChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve())
      .then(() => this.setState({ selectedManager: value }))
      .then(() => this.handleFetchOutlet(this.state.selectedManager));
  };

  handleOutletChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve())
      .then(() => this.setState({ selectedOutlet: value }))
      .then(() =>
        this.handleFetchSupervisor(
          this.state.selectedManager,
          this.state.selectedOutlet
        )
      );
  };

  handleSupervisorChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve())
      .then(() => this.setState({ selectedSupervisor: value }))
      .then(() => this.handleFetchData());
  };

  handleFetchData = async (page = 1) => {
    let { fetchFormsData, auth } = this.props;
    let { user } = auth;
    let { id, role, manager_id } = user;

    let extraParams;
    let defaultParams = {
      role,
      page,
    };

    switch (role) {
      case isAdministrator():
        var { selectedManager, selectedSupervisor } = this.state;

        extraParams = {
          managerId: selectedManager,
          supervisorId: selectedSupervisor,
        };
        break;

      case isManager():
        var { selectedSupervisor } = this.state;

        extraParams = {
          managerId: id,
          supervisorId: selectedSupervisor,
        };
        break;

      case isSupervisor():
        extraParams = {
          managerId: manager_id,
          supervisorId: id,
        };
        break;

      default:
        extraParams = {
          managerId: id,
        };
        break;
    }

    let params = { ...defaultParams, ...extraParams };

    fetchFormsData(params);

    // window.scrollTo(0, 0);
  };

  handleFormCreateByStaff = (e) => {
    e.preventDefault();

    let { selectedManager, selectedOutlet, selectedSupervisor } = this.state;

    let params = {
      selectedManager,
      selectedOutlet,
      selectedSupervisor,
    };

    console.log("params : ", params);
  };

  render() {
    const {
      isMounted,
      outletItems,
      supervisorItems,
      managerItems,
      selectedOutlet,
      selectedSupervisor,
      selectedManager,
    } = this.state;

    const { staffData } = this.props;
    const { staff } = staffData;

    const ContentSection = () => {
      if (!staffData || !isMounted) {
        return (
          <div className="table-responsive small">
            <Loader />
          </div>
        );
      }

      return (
        <React.Fragment>
          <div className="forms-containers mb-3">
            {isAdministrator() ? managerOptions : null}
            {isManagerial() ? outletOptions : null}
            {isManagerial() ? supervisorOptions : null}
          </div>

          <div className="template-view-section table-responsive small">
            <div className="table-container">
              <table className="table table-striped table-sm desktop-main-data">
                <thead>
                  <tr>
                    <th width="50">Key</th>
                    <th width="80%">Name</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {staff &&
                    Object.values(staff).map((item, index) => {
                      let { linkParams, eligible } = buildLinkUrl(
                        "form.details",
                        [item.manager_id, item.id]
                      );

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>

                          {eligible && (
                            <td
                              className="unit-actions"
                              style={{ verticalAlign: "middle" }}
                            >
                              {item.has_form_record == 1 ? (
                                <Link
                                  className="btn btn-warning"
                                  href={linkParams.url}
                                >
                                  View Form
                                </Link>
                              ) : (
                                <>
                                  <button className="btn btn-warning" disabled>
                                    No Form
                                  </button>

                                  <button
                                    className="btn btn-info ms-2"
                                    onClick={(e) =>
                                      this.handleFormCreateByStaff(e)
                                    }
                                  >
                                    Create
                                  </button>
                                </>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      );
    };

    let managerOptions = (
      <div className="btn-group me-4">
        <label className="me-2">Manager : </label>
        <select
          value={selectedManager}
          onChange={(e) => this.handleManagerChange(e)}
        >
          {managerItems.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );

    let outletOptions = (
      <div className="btn-group me-4">
        <label className="me-2">Outlet : </label>
        <select
          value={selectedOutlet}
          onChange={(e) => this.handleOutletChange(e)}
        >
          {outletItems.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );

    let supervisorOptions = (
      <div className="btn-group me-4">
        <label className="me-2">Supervisor : </label>
        <select
          value={selectedSupervisor}
          onChange={(e) => this.handleSupervisorChange(e)}
        >
          {supervisorItems &&
            supervisorItems.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
    );

    let { linkParams, eligible } = buildLinkUrl("form.create");

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Forms</h4>

            {eligible && (
              <div className="forms-containers d-flex align-items-center btn-toolbar mb-2 mb-md-0">
                <div className="btn-group">
                  <Link className="btn btn-warning me-2" href={linkParams.url}>
                    Create
                  </Link>
                </div>
              </div>
            )}
          </div>
          <ContentSection />
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  let items = {
    auth: state.auth.data,
    staffData: state.forms.data,
  };

  return items;
};

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
