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
import { getEntity, DefaultItem, CustomItem } from "../../../../utils/helpers";

class DetailTable extends Component {
  render() {
    const {
      handleRemoveAllData,
      handlePagination,
      handleSaveBtn,
      pageNumber,
      pageSize,
      isMounted,
      detailItems: items,
    } = this.props;

    const last_page = Math.ceil(items.length / pageSize);
    const newProps = {
      handlePagination: handlePagination,
      totalCount: items.length,
      pageNumber,
      pageSize,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        const ActionItem = ({ arr, item }) => {
          return (
            <React.Fragment
              key={`inner-${arr.title}-${item.product_id}-${item.product_code}`}
            >
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

            {Object.keys(items).length > 0 && (
              <div className="btn-group unit-actions">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSaveBtn(e)}
                  disabled={dataItems.length < 1}
                >
                  Save
                </button>

                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemoveAllData()}
                >
                  X Remove All
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };

    const DetailTable = () => {
      return (
        <>
          <div className="template-header-section">
            <h6 className="h6">Form Details</h6>
          </div>

          <ContentSection />
        </>
      );
    };

    return (
      <div className="template-edit-section col-6">
        {!items && !isMounted ? <Loader /> : <DetailTable />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.form.data,
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DetailTable);
