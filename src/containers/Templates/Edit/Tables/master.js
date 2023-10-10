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
  fetchMasterData,
  fetchTemplateSelectedData,
  createTemplateDetail,
} from "../../../../redux/actions";

const initialState = {
  isReady: false,
};

class MasterTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleFetchSelectedData = this.handleFetchSelectedData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => {
        this.handleFetchData();
        this.handleFetchSelectedData();
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            isReady: true,
          });
        }, 500);
      });
  }

  handleClick = async (item) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { currentTemplate, createTemplateDetail } = this.props;

        let params = {
          templateId: currentTemplate.id,
          item,
        };

        createTemplateDetail(params);
      })
      .then(() =>
        setTimeout(() => {
          this.handleFetchSelectedData();
        }, 250)
      );
  };

  handleFetchData = async (page = 1) => {
    let { fetchMasterData, master } = this.props;
    let { current_page } = master;

    // Dont do fetch, when user at the same page
    if (page == current_page) return;

    let params = {
      page,
    };

    fetchMasterData(params);

    window.scrollTo(0, 0);
  };

  handleFetchSelectedData = () => {
    let { fetchTemplateSelectedData, match } = this.props;
    let { params } = match;
    let { id } = params;

    let parameters = {
      templateId: id,
    };

    fetchTemplateSelectedData(parameters);
  };

  render() {
    const { isReady } = this.state;
    const { master, selected } = this.props;

    const { total, current_page, per_page, last_page } = master;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const { data: masterItems } = master;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const masterArrs = [
      // { title: "ID", key: "id", width: "3%" },
      { title: "Product ID", key: "product_id", width: "10%" },
      { title: "Product Code", key: "product_code", width: "15%" },
      { title: "Product Name", key: "product_name", width: "40%" },
      // { title: "Units", key: "units", width: "30%" },
      { title: "Actions", key: "actions", width: "5%" },
    ];

    const masterDataItems =
      masterItems &&
      Object.values(masterItems).map((item) => {
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
          let isSelected = selected.includes(item.product_code);

          return (
            <td className="unit-actions">
              {isSelected ? (
                <button className="unit-added btn btn-warning">Added</button>
              ) : (
                <button
                  className="btn btn-info"
                  onClick={() => this.handleClick(item)}
                >
                  + Add
                </button>
              )}
            </td>
          );
        };

        return (
          <tr key={item.product_id}>
            {masterArrs.map((arr, index) => {
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
                {masterArrs.map((arr) => {
                  return (
                    <th scope="col" width={arr.width} key={arr.title}>
                      {arr.title}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>{masterDataItems}</tbody>
          </table>

          {hasPagination(last_page)}
        </div>
      );
    };

    const MasterTable = () => {
      if (!master || !isReady) {
        return (
          <div className="template-edit-section col-6">
            <Loader />
          </div>
        );
      }

      return (
        <div className="template-edit-section col-6">
          <div className="template-header-section">
            <h6 className="h6">Master Data</h6>
          </div>

          <ContentSection />
        </div>
      );
    };

    return <MasterTable />;
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
    master: state.master.data,
    selected: state.templateSelected.data,
    currentTemplate,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMasterData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchMasterData(params)).then(() => resolve());
    });
  },
  fetchTemplateSelectedData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateSelectedData(params)).then(() => resolve());
    });
  },
  createTemplateDetail: (params) => {
    return new Promise((resolve) => {
      dispatch(createTemplateDetail(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MasterTable);
