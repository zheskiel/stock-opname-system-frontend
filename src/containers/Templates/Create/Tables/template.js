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

const initialState = {
  isMounted: false,
};

class TemplateTable extends Component {
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

            {templateArrs.length > 0 && (
              <div className="btn-group unit-actions">
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.handleRemoveAllData()}
                >
                  X Remove All
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };

    const TemplateTable = () => {
      if (!isMounted) {
        return (
          <div className="template-edit-section col-6">
            <Loader />
          </div>
        );
      }

      return (
        <div className="template-edit-section col-6">
          <div className="template-header-section">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2">
              <div className="d-flex align-items-center flex-grow-1">
                <div className="d-flex col-7 template-detail">
                  <span className="template-title">Title : </span>
                  <span className="template-title-input">
                    <input
                      className="h6 mb-0"
                      placeholder="Please type template title"
                    />
                  </span>
                </div>
                <div className="ms-3">
                  <span>Outlet : </span>
                  <select>
                    <option>Outlet 1</option>
                    <option>Outlet 2</option>
                    <option>Outlet 3</option>
                  </select>
                </div>
              </div>

              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group unit-actions">
                  <button className="btn btn-success me-2">Save</button>
                  <button className="btn btn-warning">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          <ContentSection />
        </div>
      );
    };

    return <TemplateTable />;
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
