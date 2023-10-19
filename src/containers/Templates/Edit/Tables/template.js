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
import {
  fetchTemplateViewData,
  fetchTemplateSelectedData,
  removeTemplateDetail,
  removeAllTemplateDetail,
} from "../../../../redux/actions";

// Helpers
import { getEntity } from "../../../../utils/helpers";

const initialState = {
  isMounted: false,
};

class TemplateTable extends Component {
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
        const { currentTemplate, removeAllTemplateDetail } = this.props;
        const { id } = currentTemplate;

        let params = {
          templateId: id,
        };

        removeAllTemplateDetail(params);
      })
      .then(() => {
        const { currentTemplate, fetchTemplateSelectedData } = this.props;
        const { id } = currentTemplate;

        setTimeout(() => {
          let parameters = {
            templateId: id,
          };

          fetchTemplateSelectedData(parameters);
        }, 250);
      });
  };

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
    const { isMounted } = this.state;
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

            {Object.keys(templateItems).length > 0 && (
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

    const TemplateTable = () => {
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
  let templateData = state.template.data.data;
  let currentTemplate = {
    id: templateData?.id,
    title: templateData?.title,
    slug: templateData?.slug,
  };

  return {
    details: state.template.data,
    currentTemplate,
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
  removeAllTemplateDetail: (params) => {
    return new Promise((resolve) => {
      dispatch(removeAllTemplateDetail(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
