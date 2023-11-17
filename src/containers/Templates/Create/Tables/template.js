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
import { getEntity, DefaultItem, CustomItem } from "../../../../utils/helpers";

// Styling
import "../../../../assets/scss/template.scss";

// Apis
import {
  createTemplateForOutletApi,
  fetchSupervisorsByOutletApi,
  fetchOutletsApi,
} from "../../../../apis";

const initialState = {
  isMounted: false,
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
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => {
        fetchOutletsApi()
          .then((response) => response)
          .then((result) => {
            this.setState({
              outletItems: result.data,
            });
          });
      })
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

  handleSvChange = (e) => {
    let target = e.target;
    let value = target.value;

    let managerId = target.selectedOptions[0].dataset.manager;
    let svDuty = target.selectedOptions[0].dataset.duty;

    this.setState({
      selectedSv: value,
      selectedManager: managerId,
      selectedSvDuty: svDuty,
    });
  };

  handleOutletChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve())
      .then(() => {
        this.setState({ selectedOutlet: value });
      })
      .then(() => {
        let { selectedOutlet } = this.state;
        let params = {
          outletId: selectedOutlet,
        };

        fetchSupervisorsByOutletApi(params)
          .then((response) => response)
          .then((result) => {
            this.setState({ svItems: result.data });
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
      templateTitle,
    } = this.state;

    const {
      handlePagination,
      templateItems,
      templateArrs,
      pageNumber,
      pageSize,
    } = this.props;

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
                className="btn btn-success"
                onClick={(e) => this.handleSaveBtn(e)}
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

    const TemplateTable = (
      <div className="template-edit-section col-6">
        <div className="template-header-section">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2">
            <div className="d-flex justify-content-between align-items-center flex-grow-1">
              <div className="d-flex col-5 template-detail">
                <span className="template-title">Title : </span>
                <span className="template-title-input">
                  <input
                    className="h6 mb-0"
                    placeholder="Please type template title"
                    value={templateTitle}
                    onChange={(e) => this.handleTitleChange(e)}
                  />
                </span>
              </div>

              <div className="template-item col-3 ms-2">
                <span>Outlet : </span>
                <select
                  value={selectedOutlet}
                  onChange={(e) => this.handleOutletChange(e)}
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

              <div className="template-item col-4 ms-2">
                <span>Supervisor : </span>
                <select
                  value={selectedSv}
                  onChange={(e) => this.handleSvChange(e)}
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
            </div>
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
