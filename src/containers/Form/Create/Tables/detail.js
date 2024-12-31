import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { typeOneArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Helpers
import {
  getEntity,
  getUserRole,
  DefaultItem,
  CustomItem,
  isManagerial,
  isAdministrator,
  isSupervisorial,
} from "../../../../utils/helpers";

const initialState = {
  isMounted: false,
};

class DetailTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    new Promise((resolve) => resolve()).then(() => {
      setTimeout(() => this.setState({ isMounted: true }), 500);
    });
  }

  render() {
    const { isMounted } = this.state;
    const {
      handlePagination,
      detailFitered,
      detailArrs,
      pageNumber,
      pageSize,
    } = this.props;

    const last_page = Math.ceil(detailFitered.length / pageSize);

    const newProps = {
      handlePagination: handlePagination,
      totalCount: detailFitered.length,
      pageNumber,
      pageSize,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const dataItems =
      detailArrs &&
      Object.values(detailArrs).map((item) => {
        const ActionItem = ({ arr, item }) => {
          return (
            <React.Fragment key={`inner-${arr.title}-${item.id}`}>
              <td className="unit-actions unit-section">
                <div className="unit-container">
                  <div className="unit-detail">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.props.handleRemoveData(item, pageNumber)
                      }
                    >
                      X Remove
                    </button>
                  </div>
                </div>
              </td>
            </React.Fragment>
          );
        };

        return (
          <tr key={item.id}>
            {arrs.map((arr, index) => {
              let params = { arr, item, type: "badge" };
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

              <tbody>{dataItems}</tbody>
            </table>
          </div>

          <div className="template-create-utilities d-flex justify-content-between">
            {hasPagination(last_page)}

            <div className="btn-group unit-actions">
              <button
                className="btn btn-primary"
                onClick={(e) => this.props.handleSaveBtn(e)}
                disabled={detailArrs.length < 1}
              >
                Save
              </button>

              {detailArrs.length > 0 && (
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

    const DetailTable = () => {
      if (!isMounted) {
        return (
          <div className="template-edit-section col-6">
            <Loader />
          </div>
        );
      }

      let {
        handleBeforeManagerChange,
        handleOutletChange,
        handleSupervisorChange,
        handleStaffChange,
        selectedManager,
        selectedOutlet,
        selectedStaff,
        selectedSupervisor,
        staffItems,
        managerItems,
        outletItems,
        supervisorItems,
      } = this.props;

      let optionSize;
      switch (getUserRole()) {
        case "superadmin":
        case "admin":
          optionSize = "col-3 pe-2";
          break;
        case "manager":
          optionSize = "col-4 pe-2";
          break;
        case "supervisor":
        default:
          optionSize = "col-6";
          break;
      }

      let managerOptions = (
        <div className={optionSize}>
          <div>Manager : </div>
          <select
            value={selectedManager}
            onChange={(e) => handleBeforeManagerChange(e)}
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
        <div className={optionSize}>
          <div>Outlet : </div>
          <select
            value={selectedOutlet}
            onChange={(e) => handleOutletChange(e)}
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
        <div className={optionSize}>
          <div>Supervisor : </div>
          <select
            value={selectedSupervisor}
            onChange={(e) => handleSupervisorChange(e)}
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

      let staffOptions = (
        <div className={optionSize}>
          <div>Staff : </div>
          <select value={selectedStaff} onChange={(e) => handleStaffChange(e)}>
            {staffItems &&
              staffItems.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
      );

      return (
        <div className="template-edit-section form-create-section col-6">
          <div className="template-upper-section">
            <div className="template-header-section">
              <h6 className="h6">Form</h6>
            </div>

            <div className="d-flex justify-content-start mb-3 forms-edit-containers">
              {isAdministrator() && managerOptions}
              {isManagerial() && outletOptions}
              {isManagerial() && supervisorOptions}
              {isSupervisorial() && staffOptions}
            </div>
          </div>

          <ContentSection />
        </div>
      );
    };

    return <DetailTable />;
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DetailTable);
