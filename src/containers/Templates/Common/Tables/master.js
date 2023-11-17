import React, { Component } from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { typeTwoArrs as arrs } from "../../../../constants/arrays";

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

import {
  buildItemsObj,
  getEntity,
  DefaultItem,
  CustomItem,
} from "../../../../utils/helpers";

const initialState = {
  isMounted: false,
  items: {},
  sort: "product_name",
  isDesc: false,
  order: "asc",
  orderList: ["asc", "desc"],
};

class MasterTableCommon extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleFetchSelectedData = this.handleFetchSelectedData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.setState({ items: buildItemsObj(arrs) }))
      .then(() => {
        this.handleFetchData();

        // Only Execute if edit mode
        if (this.props.mode == "edit") {
          this.handleFetchSelectedData();
        }
      })
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
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
      .then(() => setTimeout(() => this.handleFetchSelectedData(), 250));
  };

  handleFetchData = async (
    page = 1,
    sort = "product_name",
    order = "asc",
    isDesc = false
  ) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { items } = this.state;

        this.setState({ sort, order, isDesc });
        this.setState({
          items: {
            ...items,
            [sort]: {
              sort,
              order,
              isDesc,
            },
          },
        });
      })
      .then(() => {
        let { items } = this.state;
        let { sort: sortState, order: orderState } = items[sort];
        let { fetchMasterData } = this.props;

        let params = {
          sort: sortState,
          order: orderState,
          page,
        };

        fetchMasterData(params);

        // window.scrollTo(0, 0);
      });
  };

  handlePagination = async (page) => {
    return new Promise((resolve) => resolve()).then(() => {
      let { sort, order, isDesc } = this.state;

      this.handleFetchData(page, sort, order, isDesc);
    });
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
    const { isMounted } = this.state;
    const { master, pageNumber, mode } = this.props;

    // Only Execute if edit mode
    const selected =
      mode == "edit" ? this.props.selected : this.props.selectedItems;

    const { total, current_page, per_page, last_page } = master;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handlePagination,
    };

    const { data: masterItems } = master;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const masterDataItems =
      masterItems &&
      Object.values(masterItems).map((item) => {
        const ActionItem = ({ item }) => {
          let isSelected = selected.includes(item.product_code);
          let { mode } = this.props;

          // Only Execute if edit mode
          let actionBtn =
            mode == "edit"
              ? () => this.handleClick(item)
              : () => this.props.handleClick(item, pageNumber);

          return (
            <td className="unit-actions">
              {isSelected ? (
                <button className="unit-added btn btn-warning">Added</button>
              ) : (
                <button className="btn btn-info" onClick={actionBtn}>
                  + Add
                </button>
              )}
            </td>
          );
        };

        return (
          <tr key={item.product_id}>
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
                    let { items } = this.state;
                    let { isDesc } = items[arr.key];
                    let newIsDesc = !isDesc;

                    return (
                      <th
                        scope="col"
                        width={arr.width}
                        key={arr.title}
                        onClick={() => {
                          let { items, orderList } = this.state;
                          let { sort, isDesc } = items[arr.key];
                          let newIsDesc = !isDesc;
                          let newOrder = orderList[isDesc ? 0 : 1];

                          arr.key !== "actions" &&
                            this.handleFetchData(
                              current_page,
                              sort,
                              newOrder,
                              newIsDesc
                            );
                        }}
                      >
                        {arr.key !== "actions" && (
                          <>{newIsDesc ? <FaAngleUp /> : <FaAngleDown />}</>
                        )}

                        {arr.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>{masterDataItems}</tbody>
            </table>
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    const MasterTable = () => {
      if (!master || !isMounted) {
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
)(MasterTableCommon);
