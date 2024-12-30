import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Array Data
import { typeTwoArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Actions
import { fetchTemplateSelectedData } from "../../../../redux/actions";

// Helpers
import { getEntity, DefaultItem, CustomItem } from "../../../../utils/helpers";

class TemplateTable extends Component {
  render() {
    const {
      handleRemoveAllData,
      handleRemoveData,
      handlePagination,
      handleSaveBtn,
      pageNumber,
      pageSize,
      isMounted,
      templateItems: items,
      templateDetail,
    } = this.props;

    const last_page = Math.ceil(items?.length / pageSize);

    const newProps = {
      handlePagination,
      totalCount: items?.length,
      pageNumber,
      pageSize,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        const ActionItem = ({ item }) => {
          return (
            <td className="unit-actions">
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveData(item, pageNumber)}
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

              <tbody>{dataItems}</tbody>
            </table>
          </div>

          <div className="template-create-utilities d-flex justify-content-between">
            {hasPagination(last_page)}

            <div className="btn-group unit-actions">
              <button
                className="btn btn-primary"
                onClick={(e) => handleSaveBtn(e)}
                disabled={items.length < 1}
              >
                Save
              </button>

              {items && Object.keys(items).length > 0 && (
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemoveAllData()}
                >
                  X Remove All
                </button>
              )}
            </div>
          </div>
        </div>
      );
    };

    const TemplateTable = () => {
      return (
        <>
          <div className="template-header-section">
            <h6 className="h6">{templateDetail?.title}'s Template</h6>
          </div>

          <ContentSection />
        </>
      );
    };

    return (
      <div className="template-edit-section col-6">
        {!items && !isMounted ? <Loader /> : <TemplateTable />}
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchTemplateSelectedData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateSelectedData(params)).then(() => resolve());
    });
  },
  removeTemplateDetail: (params) => {
    return new Promise((resolve) => {
      dispatch(removeTemplateDetail(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
