import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { typeTwoArrs as arrs } from "../../../../constants/arrays";

// Sections
import PaginationSection from "../../../../sections/Pagination";

// Components
import Loader from "../../../../components/Loader";

// Actions
import { fetchMasterData } from "../../../../redux/actions";

const initialState = {
  isReady: false,
};

class MasterTable extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
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

  render() {
    const { isReady } = this.state;
    const { master, pageNumber, selectedItems: selected } = this.props;

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
                  onClick={() => this.props.handleClick(item, pageNumber)}
                >
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

              <tbody>{masterDataItems}</tbody>
            </table>
          </div>

          {hasPagination(last_page)}
        </div>
      );
    };

    const MasterTable = () => {
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
            <h6 className="h6">Master Data</h6>
          </div>

          <ContentSection />
        </div>
      );
    };

    return <MasterTable />;
  }
}

const mapStateToProps = (state) => ({
  master: state.master.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMasterData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchMasterData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MasterTable);