import React, { Component } from "react";

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
  createFormDetail,
  fetchTemplateViewData,
  fetchFormDetailsSelectedData,
} from "../../../../redux/actions";

const initialState = {
  isReady: false,
};

class TemplateTable extends Component {
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

  handleClick = async (item, selectedUnit) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { createFormDetail, match } = this.props;
        const { params } = match;

        let parameters = {
          ...params,
          item,
          selectedUnit,
        };

        createFormDetail(parameters);
      })
      .then(() =>
        setTimeout(() => {
          this.handleFetchSelectedData();
        }, 250)
      );
  };

  handleFetchData = (page = 1) => {
    const { fetchTemplateViewData, match } = this.props;
    const { params } = match;
    const { templateId } = params;

    let parameters = {
      templateId,
      page,
    };

    fetchTemplateViewData(parameters);

    window.scrollTo(0, 0);
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
    const { isReady } = this.state;
    const { templatesDetails, selected } = this.props;

    const { total, current_page, per_page, last_page } = templatesDetails;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
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

        const ActionItem = ({ arr, item }) => {
          let itemUnits = Object.entries(item.units);
          let selectedLimit = 1;
          let selectedCount = 0;

          return (
            <React.Fragment key={`inner-${arr.title}-${item.id}`}>
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

                    if (isSelected == true) {
                      selectedCount += 1;
                    }

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
                          onClick={() => this.handleClick(item, unit[0])}
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

              <tbody>{templateDataItems}</tbody>
            </table>
          </div>

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
  createFormDetail: (params) => {
    return new Promise((resolve) => {
      dispatch(createFormDetail(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateTable);
