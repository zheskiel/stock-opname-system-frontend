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
  fetchTemplateViewData,
  fetchTemplateSelectedData,
  removeTemplateDetail,
} from "../../../../redux/actions";

const initialState = {
  isReady: false,
};

class TemplateTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => {
        this.handleFetchData();
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            isReady: true,
          });
        }, 500);
      });
  }

  handleRemoveData = async (item) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { removeTemplateDetail, details } = this.props;

        let { templates_id, product_id } = item;
        let { current_page } = details;

        let params = {
          templateId: templates_id,
          productId: product_id,
          currentPage: current_page,
        };

        removeTemplateDetail(params);
      })
      .then(() => {
        const { fetchTemplateSelectedData } = this.props;

        setTimeout(() => {
          let parameters = {
            templateId: item.templates_id,
          };

          fetchTemplateSelectedData(parameters);
        }, 250);
      });
  };

  handleFetchData = (page = 1) => {
    const { fetchTemplateViewData, match } = this.props;
    const { params } = match;
    const { id } = params;

    let parameters = {
      templateId: id,
      page: page,
    };

    fetchTemplateViewData(parameters);

    window.scrollTo(0, 0);
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

    const { data } = details;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    if (!data) return <></>;

    const { details: templateItems } = data;

    const templateArrs = [
      // { title: "ID", key: "id", width: "3%" },
      { title: "Product ID", key: "product_id", width: "10%" },
      { title: "Product Code", key: "product_code", width: "15%" },
      { title: "Product Name", key: "product_name", width: "40%" },
      // { title: "Tolerance", key: "receipt_tolerance", width: "10%" },
      // { title: "Units", key: "units", width: "30%" },
      { title: "Actions", key: "actions", width: "5%" },
    ];

    const templateDataItems =
      templateItems &&
      Object.values(templateItems).map((item) => {
        const DefaultItem = ({ arr, item }) => {
          return <td key={`inner-${arr.title}-${item.id}`}>{item[arr.key]}</td>;
        };

        const CustomItem = ({ arr, item }) => {
          let itemUnits = Object.entries(item.units);

          return (
            <React.Fragment key={`inner-${arr.title}-${item.id}`}>
              <td className="unit-section">
                {itemUnits.length > 0 &&
                  itemUnits.map((unit, index) => {
                    return (
                      <div key={index} className="unit-container">
                        <div className="unit-detail">
                          <span>{unit[0]}</span>
                          <span>
                            {unit[1].value} {unit[1].sku}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </td>
            </React.Fragment>
          );
        };

        const ActionItem = ({ item }) => {
          return (
            <td className="unit-actions">
              <button
                className="btn btn-danger"
                onClick={() => this.handleRemoveData(item)}
              >
                X Remove
              </button>
            </td>
          );
        };

        return (
          <tr key={item.id}>
            {templateArrs.map((arr, index) => {
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
          <table className="table table-striped table-sm desktop-main-data">
            <thead>
              <tr>
                {templateArrs.map((arr) => {
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

          {hasPagination(last_page)}
        </div>
      );
    };

    const TemplateTable = () => {
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
            <h6 className="h6">{data.title}'s Template</h6>
          </div>

          <ContentSection />
        </div>
      );
    };

    return <TemplateTable />;
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.template.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTemplateViewData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateViewData(params)).then(() => resolve());
    });
  },
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
