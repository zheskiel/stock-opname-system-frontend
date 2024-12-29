import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { typeTwoArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Helpers
import {
  getEntity,
  DefaultItem,
  CustomItem,
  isAdministrator,
} from "../../../../utils/helpers";

// Styling
import "../../../../assets/scss/template.scss";

// Apis
import {
  createTemplateForOutletApi,
  fetchSupervisorsByOutletApi,
  fetchOutletsApi,
  fetchManagersApi,
  fetchOutletByManagerApi,
} from "../../../../apis";

const initialState = {
  isMounted: false,
  managerItems: [],
  outletItems: [],
  svItems: [],
  templateTitle: "",
  selectedOutlet: 1,
  selectedSv: undefined,
  selectedManager: undefined,
  selectedSvDuty: undefined,
};

class TemplateTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleSaveBtn = this.handleSaveBtn.bind(this);
    this.handleSvChange = this.handleSvChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleOutletChange = this.handleOutletChange.bind(this);
    this.handleManagerChange = this.handleManagerChange.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() =>
        isAdministrator() ? this.fetchManager() : this.fetchOutlet()
      )
      .then(() => {
        let { selectedOutlet } = this.state;
        let params = {
          outletId: selectedOutlet,
        };

        fetchSupervisorsByOutletApi(params)
          .then((response) => response)
          .then((result) => {
            let supervisors = result.data;
            let firstSv = supervisors[0];

            this.setState({
              svItems: supervisors,
              selectedSv: firstSv.id,
              selectedManager: firstSv.manager.id,
              selectedSvDuty: firstSv.duty,
            });
          });
      })
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  fetchManager = async () => {
    return fetchManagersApi()
      .then((response) => response)
      .then((result) => {
        this.setState({ managerItems: result.data }, () => {
          let managerData = result.data[0];

          if (managerData) {
            fetchOutletByManagerApi(managerData)
              .then((response) => response)
              .then((result) => {
                this.setState({ outletItems: result.data });
              });
          }
        });
      });
  };

  fetchOutlet = () => {
    fetchOutletsApi()
      .then((response) => response)
      .then((result) => {
        this.setState({ outletItems: result.data });
      });
  };

  handleSaveBtn = (e) => {
    e.preventDefault();

    let {
      selectedOutlet,
      selectedSv,
      selectedSvDuty,
      selectedManager,
      templateTitle,
    } = this.state;

    let { templateItems } = this.props;

    let params = {
      title: templateTitle,
      outletId: selectedOutlet,
      supervisorId: selectedSv,
      supervisorDuty: selectedSvDuty,
      managerId: selectedManager,
      items: JSON.stringify(templateItems),
    };

    createTemplateForOutletApi(params)
      .then((response) => response)
      .then(() => {
        this.props.history.push("/templates");
      });
  };

  handleSvChange = (value, managerId, svDuty) => {
    this.setState({
      selectedSv: value,
      selectedManager: managerId,
      selectedSvDuty: svDuty,
    });
  };

  handleManagerChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({ selectedManager: value }, () => {
      fetchOutletByManagerApi(value)
        .then((response) => response)
        .then((result) => {
          this.setState({ outletItems: result.data }, () => {
            let outlet = result.data[0];

            if (outlet) {
              this.handleOutletChange(outlet.id);
            }
          });
        });
    });
  };

  handleOutletChange = (outletValue) => {
    new Promise((resolve) => resolve()).then(() => {
      this.setState({ selectedOutlet: outletValue }, () => {
        fetchSupervisorsByOutletApi({
          outletId: outletValue,
        })
          .then((response) => response)
          .then((result) => {
            this.setState({ svItems: result.data }, () => {
              let sv = result.data[0];

              if (sv) {
                this.handleSvChange(sv.id, sv.manager_id, sv.duty);
              }
            });
          });
      });
    });
  };

  handleTitleChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({ templateTitle: value });
  };

  render() {
    const {
      isMounted,
      selectedSv,
      svItems,
      selectedOutlet,
      outletItems,
      selectedManager,
      managerItems,
      templateTitle,
    } = this.state;

    const {
      handlePagination,
      templateItems,
      templateArrs,
      pageNumber,
      pageSize,
      auth,
    } = this.props;

    const { user } = auth;
    const { role } = user;
    const isAdmin = role == "superadmin" || role == "admin";

    const last_page = Math.ceil(templateItems.length / pageSize);

    const newProps = {
      handlePagination: handlePagination,
      totalCount: templateItems.length,
      pageNumber,
      pageSize,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const templateDataItems =
      templateArrs &&
      Object.values(templateArrs).map((item) => {
        const ActionItem = ({ item }) => {
          return (
            <td className="unit-actions">
              <button
                className="btn btn-danger"
                onClick={() => this.props.handleRemoveData(item, pageNumber)}
              >
                X Remove
              </button>
            </td>
          );
        };

        return (
          <tr key={item.id}>
            {arrs.map((arr, index) => {
              let params = { arr, item };
              let entities = {
                action: ActionItem,
                custom: CustomItem,
                default: DefaultItem,
              };

              let Entity = getEntity(entities, params);

              return (
                <React.Fragment key={index}>
                  <Entity key={index} {...params} />
                </React.Fragment>
              );
            })}
          </tr>
        );
      });

    const ContentSection = () => {
      return (
        <div className="table-responsive small">
          <div className="table-container">
            <table className="table table-striped table-sm desktop-main-data">
              <thead>
                <tr>
                  {arrs.map((arr) => {
                    return (
                      <th scope="col" width={arr.width} key={arr.title}>
                        {arr.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>{templateDataItems}</tbody>
            </table>
          </div>

          <div className="template-create-utilities d-flex justify-content-between">
            {hasPagination(last_page)}

            <div className="btn-group unit-actions">
              <button
                className="btn btn-primary"
                onClick={(e) => this.handleSaveBtn(e)}
                disabled={templateArrs.length < 1}
              >
                Save
              </button>

              {templateArrs.length > 0 && (
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => this.props.handleRemoveAllData()}
                >
                  X Remove All
                </button>
              )}
            </div>
          </div>
        </div>
      );
    };

    const titleOption = (
      <div className="col-12 template-detail pt-2">
        <div>Title : </div>
        <span className="template-title-input">
          <input
            className="h6 mb-0"
            placeholder="Please type template title"
            value={templateTitle}
            onChange={(e) => this.handleTitleChange(e)}
          />
        </span>
      </div>
    );

    const managerOptions = (
      <div className={`template-item col-4 pe-2`}>
        <div>Manager : </div>
        <select
          value={selectedManager}
          onChange={(e) => this.handleManagerChange(e)}
        >
          {managerItems &&
            managerItems.map((manager) => {
              return (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              );
            })}
        </select>
      </div>
    );

    const outletOptions = (
      <div className={`template-item col-${isAdmin ? `4` : `6`} pe-2`}>
        <div>Outlet : </div>
        <select
          value={selectedOutlet}
          onChange={(e) => {
            let target = e.target;
            let outletValue = target.value;

            this.handleOutletChange(outletValue);
          }}
        >
          {outletItems &&
            outletItems.map((outlet) => {
              return (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.name}
                </option>
              );
            })}
        </select>
      </div>
    );

    const templateOptions = (
      <div className={`template-item col-${isAdmin ? `4` : `6`}`}>
        <div>Supervisor : </div>
        <select
          value={selectedSv}
          onChange={(e) => {
            let target = e.target;
            let value = target.value;

            let managerId = target.selectedOptions[0].dataset.manager;
            let svDuty = target.selectedOptions[0].dataset.duty;

            this.handleSvChange(value, managerId, svDuty);
          }}
        >
          {svItems &&
            svItems.map((sv) => {
              return (
                <option
                  key={sv.id}
                  value={sv.id}
                  data-manager={sv.manager.id}
                  data-duty={sv.duty}
                >
                  {sv.name}
                </option>
              );
            })}
        </select>
      </div>
    );

    const TemplateTable = (
      <div className="template-edit-section col-6">
        <div className="template-header-section">
          <div className="pb-2">
            <div className="d-flex justify-content-between align-items-center flex-grow-1">
              {isAdmin && managerOptions}
              {outletOptions}
              {templateOptions}
            </div>

            <div>{titleOption}</div>
          </div>
        </div>

        <ContentSection />
      </div>
    );

    const LoaderItem = (
      <div className="template-edit-section col-6">
        <Loader />
      </div>
    );

    return !isMounted ? LoaderItem : TemplateTable;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.data,
});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
