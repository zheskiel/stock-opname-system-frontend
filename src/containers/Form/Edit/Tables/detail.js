import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Actions
import {
  fetchFormDetailsData,
  fetchFormDetailsSelectedData,
  removeFormDetail,
} from "../../../../redux/actions";

const initialState = {
  isReady: false,
};

class DetailTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => {
          this.setState({
            isReady: true,
          });
        }, 500);
      });
  }

  handleFetchData = (page = 1) => {
    let { fetchFormDetailsData, match } = this.props;
    let params = {
      ...match.params,
      page,
    };

    fetchFormDetailsData(params);

    window.scrollTo(0, 0);
  };

  handleRemoveData = async (item) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { removeFormDetail, match } = this.props;
        const { params } = match;

        let { id, templates_id, product_id } = item;

        let parameters = {
          ...params,
          templateId: templates_id,
          productId: product_id,
          itemId: id,
        };

        removeFormDetail(parameters);
      })
      .then(() => {
        const { fetchFormDetailsSelectedData, match } = this.props;

        let { params } = match;

        setTimeout(() => {
          let parameters = {
            ...params,
          };

          fetchFormDetailsSelectedData(parameters);
        }, 250);
      });
  };

  render() {
    const { isReady } = this.state;
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

    const arrs = [
      // { title: "ID", key: "id", width: "3%" },
      { title: "Product ID", key: "product_id", width: "10%" },
      { title: "Product Code", key: "product_code", width: "15%" },
      { title: "Product Name", key: "product_name", width: "40%" },
      // { title: "Tolerance", key: "receipt_tolerance", width: "10%" },
      { title: "Unit", key: "unit", width: "30%" },
      { title: "Actions", key: "actions", width: "5%" },
    ];

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        const DefaultItem = ({ arr, item }) => {
          return <td key={`inner-${arr.title}-${item.id}`}>{item[arr.key]}</td>;
        };

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
              let params = { arr, item };
              let entities = {
                action: ActionItem,
                default: DefaultItem,
              };

              let Entity = (params) => {
                let Item;

                switch (arr.key) {
                  case "actions":
                    Item = entities.action;
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

          {hasPagination(last_page)}
        </div>
      );
    };

    const DetailTable = () => {
      if (!data || !isReady) {
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
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DetailTable);
