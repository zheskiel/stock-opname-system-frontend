import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { typeOneArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

const initialState = {
  isReady: false,
};

class DetailTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    new Promise((resolve) => resolve()).then(() => {
      setTimeout(() => {
        this.setState({
          isReady: true,
        });
      }, 500);
    });
  }

  render() {
    const { isReady } = this.state;

    // return <>Test</>;

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
        const DefaultItem = ({ arr, item }) => {
          return <td key={`inner-${arr.title}-${item.id}`}>{item[arr.key]}</td>;
        };

        const CustomItem = ({ arr, item }) => {
          let itemUnits = Object.entries(item.units);

          return (
            <React.Fragment key={`inner-${arr.title}-${item.id}`}>
              <td className="unit-section badges-section">
                <div className="unit-container">
                  {itemUnits.length > 0 &&
                    itemUnits.map((unit, index) => {
                      return (
                        <React.Fragment key={index}>
                          <span className="badge bg-primary">
                            {unit[1].unit}
                          </span>
                        </React.Fragment>
                      );
                    })}
                </div>
              </td>
            </React.Fragment>
          );
        };

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
              let params = { arr, item };
              let entities = {
                action: ActionItem,
                custom: CustomItem,
                default: DefaultItem,
              };

              let Entity = (params) => {
                let Item;

                switch (arr.key) {
                  case "actions":
                    Item = entities.action;
                    break;

                  case "units":
                    Item = entities.custom;
                    break;

                  default:
                    Item = entities.default;
                    break;
                }

                return <Item {...params} />;
              };

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

            {detailArrs.length > 0 && (
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

    const DetailTable = () => {
      if (!isReady) {
        return (
          <div className="template-edit-section col-6">
            <Loader />
          </div>
        );
      }

      return (
        <div className="template-edit-section col-6">
          <div className="template-header-section">
            <h6 className="h6">Create Form</h6>
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
