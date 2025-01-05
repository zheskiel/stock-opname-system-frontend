import React, { Component } from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Array Data
import { typeOneArrs as arrs } from "../../../../constants/arrays";

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
  CreateTemplateButton,
} from "../../../../utils/helpers";

const initialState = {
  isMounted: false,
};

class TemplateTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isMounted: true }), 1000);
  }

  render() {
    const { isMounted } = this.state;
    const {
      handlePagination,
      templatesDetails,
      selectedItems: selected,
    } = this.props;

    const { total, current_page, per_page, last_page } = templatesDetails;
    const newProps = {
      handlePagination,
      pageNumber: current_page,
      totalCount: total,
      pageSize: per_page,
    };

    const { data } = templatesDetails;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const templateItems = data?.details;

    const templateDataItems =
      templateItems &&
      Object.values(templateItems).map((item) => {
        const ActionItem = ({ arr, item }) => {
          let itemUnits = Object.entries(item.units);
          let selectedLimit = 1;
          let selectedCount = 0;

          return (
            <React.Fragment key={`inner-${arr.title}-${item.id}`}>
              <td className="unit-actions unit-section">
                {itemUnits.length > 0 &&
                  itemUnits.map((unit, index) => {
                    let isSelected = selected.some((target) => {
                      let targetUnit = target.unit,
                        realUnit = unit[0];

                      return (
                        target.product_code == item.product_code &&
                        targetUnit.trim() == realUnit.trim()
                      );
                    });

                    if (isSelected == true) {
                      selectedCount += 1;
                    }

                    let isDisabled = selected.some((target) => {
                      return (
                        selectedCount > selectedLimit &&
                        target.product_code == item.product_code
                      );
                    });

                    const SelectedBtn = () => {
                      return (
                        <button className="unit-added btn btn-warning">
                          Added
                        </button>
                      );
                    };

                    const CustomBtn = () => {
                      return !isDisabled ? <NormalBtn /> : <DisabledBtn />;
                    };

                    const NormalBtn = () => {
                      return (
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            this.props.handleClick(item, unit[0], unit[1])
                          }
                        >
                          + Add
                        </button>
                      );
                    };

                    const DisabledBtn = () => {
                      return (
                        <button className="unit-added btn btn-secondary">
                          -
                        </button>
                      );
                    };

                    const FinalBtn = () => {
                      return selectedCount <= selectedLimit ? (
                        <CustomBtn />
                      ) : (
                        <DisabledBtn />
                      );
                    };

                    const ResultBtn = () => {
                      return isSelected ? <SelectedBtn /> : <FinalBtn />;
                    };

                    return (
                      <div key={index} className="unit-container">
                        <div className="unit-detail">
                          <ResultBtn />
                        </div>
                      </div>
                    );
                  })}
              </td>
            </React.Fragment>
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
      const RenderSection = () => {
        if (templateItems && templateItems.length > 0) {
          return <>{templateDataItems}</>;
        }

        return (
          <tr>
            <td colSpan={5}>
              <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <p>No Templates Created</p>

                <CreateTemplateButton />
              </div>
            </td>
          </tr>
        );
      };
      return (
        <div className="table-responsive small">
          <div className="table-container">
            <table className="table table-striped table-sm desktop-main-data">
              <thead>
                <tr>
                  {arrs.map((arr) => {
                    let { items } = this.props;
                    let { isDesc } = items[arr.key];
                    let newIsDesc = !isDesc;

                    return (
                      <th
                        scope="col"
                        width={arr.width}
                        key={arr.title}
                        onClick={() => {
                          let { items, orderList } = this.props;
                          let { sort, isDesc } = items[arr.key];
                          let newIsDesc = !isDesc;
                          let newOrder = orderList[isDesc ? 0 : 1];

                          arr.key !== "actions" &&
                            arr.key !== "units" &&
                            this.props.handleFetchTemplatedata(
                              current_page,
                              sort,
                              newOrder,
                              newIsDesc
                            );
                        }}
                      >
                        {arr.key !== "actions" && arr.key !== "units" && (
                          <>{newIsDesc ? <FaAngleUp /> : <FaAngleDown />}</>
                        )}

                        {arr.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                <RenderSection />
              </tbody>
            </table>
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    const TemplateTable = () => {
      let { selectedManager, managerItems } = this.props;
      let managerOptions = (
        <div className="col-6 pe-2">
          <div>Manager : </div>
          <select
            value={selectedManager}
            onChange={(e) => this.props.handleBeforeManagerChange(e)}
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

      let { selectedTemplate, templateItems } = this.props;
      let templateOptions = (
        <div className="col-6">
          <div>Template : </div>
          <select
            value={selectedTemplate}
            onChange={(e) => this.props.handleBeforeTemplateChange(e)}
          >
            {templateItems.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
      );

      return (
        <>
          <div className="template-upper-section">
            <div className="template-header-section">
              <h6 className="h6">Template</h6>
            </div>

            <div className="d-flex justify-content-start mb-3">
              {isAdministrator() && managerOptions}
              {templateOptions}
            </div>
          </div>

          <ContentSection />
        </>
      );
    };

    return (
      <div className="template-edit-section form-create-section col-6">
        {!isMounted ? <Loader /> : <TemplateTable />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.data,
  formDetails: state.form.data,
  templatesDetails: state.template.data,
  selected: state.formDetailsSelected.data,
});
const mapDispatchToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
