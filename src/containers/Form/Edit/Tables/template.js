import React, { Component } from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Array Data
import { typeOneArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Actions
import {
  createFormDetails,
  fetchTemplateViewData,
  fetchFormDetailsSelectedData,
} from "../../../../redux/actions";

// Helpers
import {
  buildItemsObj,
  getEntity,
  DefaultItem,
  CustomItem,
} from "../../../../utils/helpers";

const initialState = {
  isMounted: false,
  items: {},
  sort: "id",
  isDesc: true,
  order: "desc",
  orderList: ["asc", "desc"],
};

class TemplateTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleFetchSelectedData = this.handleFetchSelectedData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.setState({ items: buildItemsObj(arrs) }))
      .then(() => this.handleFetchData())
      .then(() => {
        // this.handleFetchSelectedData()
      })
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchData = async (
    page = 1,
    sort = "id",
    order = "desc",
    isDesc = true
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

        const { fetchTemplateViewData, match } = this.props;
        const { params } = match;
        const { templateId } = params;

        let parameters = {
          withLimit: 1,
          sort: sortState,
          order: orderState,
          templateId,
          page,
        };

        fetchTemplateViewData(parameters);

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
    let { fetchFormDetailsSelectedData, match } = this.props;
    let { params } = match;

    let parameters = {
      ...params,
    };

    fetchFormDetailsSelectedData(parameters);
  };

  render() {
    const { isMounted } = this.state;
    const { templatesDetails, selectedItems: selected } = this.props;

    const { total, current_page, per_page, last_page } = templatesDetails;
    const newProps = {
      handlePagination: this.handlePagination,
      pageNumber: current_page,
      pageSize: per_page,
      totalCount: total,
    };

    const { data } = templatesDetails;

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    if (!data) return <></>;

    const { details: templateItems } = data;

    const templateDataItems =
      templateItems &&
      Object.values(templateItems).map((item) => {
        const ActionItem = ({ arr, item }) => {
          let itemUnits = Object.entries(item.units);
          let selectedLimit = 1;
          let selectedCount = 0;

          return (
            <React.Fragment key={`inner-${arr.title}-${item.product_id}`}>
              <td className="unit-actions unit-section">
                {itemUnits.length > 0 &&
                  itemUnits.map((unit, index) => {
                    let isSelected = selected.some((target) => {
                      let targetUnit = target.unit,
                        realUnit = unit[0];

                      return (
                        target.product_code == item.product_code &&
                        targetUnit.trim() == realUnit.trim()
                      );
                    });

                    if (isSelected == true) selectedCount += 1;

                    let isDisabled = selected.some((target) => {
                      return (
                        selectedCount > selectedLimit &&
                        target.product_code == item.product_code
                      );
                    });

                    const SelectedBtn = () => {
                      return (
                        <button className="unit-added btn btn-warning">
                          Added
                        </button>
                      );
                    };

                    const CustomBtn = () => {
                      return !isDisabled ? <NormalBtn /> : <DisabledBtn />;
                    };

                    const NormalBtn = () => {
                      return (
                        <button
                          className="btn btn-info"
                          onClick={() => this.props.handleClick(item, unit[0])}
                        >
                          + Add
                        </button>
                      );
                    };

                    const DisabledBtn = () => {
                      return (
                        <button className="unit-added btn btn-secondary">
                          -
                        </button>
                      );
                    };

                    const FinalBtn = () => {
                      return selectedCount <= selectedLimit ? (
                        <CustomBtn />
                      ) : (
                        <DisabledBtn />
                      );
                    };

                    const ResultBtn = () => {
                      return isSelected ? <SelectedBtn /> : <FinalBtn />;
                    };

                    return (
                      <div key={index} className="unit-container">
                        <div className="unit-detail">
                          <ResultBtn />
                        </div>
                      </div>
                    );
                  })}
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
                            arr.key !== "units" &&
                            this.handleFetchData(
                              current_page,
                              sort,
                              newOrder,
                              newIsDesc
                            );
                        }}
                      >
                        {arr.key !== "actions" && arr.key !== "units" && (
                          <>{newIsDesc ? <FaAngleUp /> : <FaAngleDown />}</>
                        )}

                        {arr.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>{templateDataItems}</tbody>
            </table>
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    const TemplateTable = (
      <>
        <div className="template-header-section">
          <h6 className="h6">{data.title}'s Template</h6>
        </div>

        <ContentSection />
      </>
    );

    return (
      <div className="template-edit-section col-6">
        {!data || !isMounted ? <Loader /> : TemplateTable}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formDetails: state.form.data,
    templatesDetails: state.template.data,
    selected: state.formDetailsSelected.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTemplateViewData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateViewData(params)).then(() => resolve());
    });
  },
  fetchFormDetailsSelectedData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormDetailsSelectedData(params)).then(() => resolve());
    });
  },
  createFormDetails: (params) => {
    return new Promise((resolve) => {
      dispatch(createFormDetails(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
