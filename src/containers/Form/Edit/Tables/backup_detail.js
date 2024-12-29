import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { typeOneArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Actions
import {
  fetchFormDetailsData,
  fetchFormDetailsSelectedData,
  removeFormDetail,
  removeAllFormDetail,
} from "../../../../redux/actions";

// Helpers
import { getEntity, DefaultItem, CustomItem } from "../../../../utils/helpers";

const initialState = {
  isMounted: false,
};

class DetailTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.handleRemoveAllData = this.handleRemoveAllData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleRemoveAllData = async () => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { removeAllFormDetail, match } = this.props;

        let parameters = {
          ...match.params,
        };

        removeAllFormDetail(parameters);
      })
      .then(() => {
        const { fetchFormDetailsSelectedData, match } = this.props;

        setTimeout(() => {
          let parameters = {
            ...match.params,
          };

          fetchFormDetailsSelectedData(parameters);
        }, 250);
      });
  };

  handleRemoveData = async (item) => {};

  handleFetchData = async (page = 1) => {};

  render() {
    const { isMounted } = this.state;
    const { details } = this.props;

    const { total, current_page, per_page, last_page } = details;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const { data } = details;

    if (!data) return <></>;

    const { items } = data;

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        const ActionItem = ({ arr, item }) => {
          return (
            <React.Fragment key={`inner-${arr.title}-${item.id}`}>
              <td className="unit-actions unit-section">
                <div className="unit-container">
                  <div className="unit-detail">
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleRemoveData(item)}
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
                  className="btn btn-danger"
                  onClick={() => this.handleRemoveAllData()}
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
      if (!data || !isMounted) {
        return (
          <div className="template-edit-section col-6">
            <Loader />
          </div>
        );
      }

      return (
        <div className="template-edit-section col-6">
          <div className="template-header-section">
            <h6 className="h6">Form Details</h6>
          </div>

          <ContentSection />
        </div>
      );
    };

    return <DetailTable />;
  }
}

const mapStateToProps = (state) => ({
  details: state.form.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFormDetailsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormDetailsData(params)).then(() => resolve());
    });
  },
  fetchFormDetailsSelectedData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormDetailsSelectedData(params)).then(() => resolve());
    });
  },
  removeFormDetail: (params) => {
    return new Promise((resolve) => {
      dispatch(removeFormDetail(params)).then(() => resolve());
    });
  },
  removeAllFormDetail: (params) => {
    return new Promise((resolve) => {
      dispatch(removeAllFormDetail(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DetailTable);
