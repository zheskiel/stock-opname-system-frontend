import React, { Component } from "react";

import { getMasterApi } from "../../apis";

// Sections
import PaginationSection from "../Pagination";

// Components
import Footer from "../../components/Footer";

import "../../assets/scss/main.scss";

const initialState = {
  mode: "desktop",
  data: [],
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

class MainSection extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handlePageResize = this.handlePageResize.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  async componentDidMount() {
    this.handlePageResize();

    window.addEventListener("resize", this.handlePageResize);

    await getMasterApi().then((items) => {
      this.setState({ data: items.data });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handlePageResize);
  }

  handlePageResize = () => {
    let windowSize = getWindowDimensions();
    let minDesktopLimit = 900;

    let terms = windowSize.width < minDesktopLimit ? "phone" : "desktop";

    this.setState({
      mode: terms,
    });
  };

  handlePagination = async (page) => {
    await getMasterApi(page).then((items) => {
      this.setState({ data: items.data });
    });
  };

  render() {
    const { data, mode } = this.state;
    const { data: items } = data;

    const { total, current_page, per_page } = data;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handlePagination,
    };

    return (
      <div className="main-content col-md-9 ms-sm-auto col-lg-10 px-md-4 pb-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2 className="h2">Master Product</h2>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
              </button>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
            >
              This week
            </button>
          </div>
        </div>

        <div className="table-responsive small">
          <PaginationSection {...newProps} />

          {mode == "phone" ? (
            <div className="division-table">
              {items &&
                Object.values(items).map((item) => {
                  let itemUnits = Object.entries(item.units);

                  return (
                    <div className="division-container" key={item.product_id}>
                      <div className="division-section">
                        <span className="division-title">Product ID</span>
                        <span>{item.product_id}</span>
                      </div>
                      <div className="division-section">
                        <span className="division-title">Category</span>
                        <span>{item.category}</span>
                      </div>

                      <div className="division-section">
                        <span className="division-title">Category Type</span>
                        <span>{item.category_type}</span>
                      </div>

                      <div className="division-section">
                        <span className="division-title">Sub Category</span>
                        <span>{item.subcategory}</span>
                      </div>

                      <div className="division-section">
                        <span className="division-title">Units</span>
                        <span className="units-section">
                          {itemUnits.length > 0 &&
                            itemUnits.map((unit, index) => {
                              return (
                                <div key={index}>
                                  {unit[0]} -- {unit[1].value} {unit[1].sku}
                                </div>
                              );
                            })}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <table className="table table-striped table-sm desktop-main-data">
              <thead>
                <tr>
                  <th scope="col" width="5%">
                    Product ID
                  </th>
                  <th scope="col" width="20%">
                    Category
                  </th>
                  <th scope="col" width="10%">
                    Category Type
                  </th>
                  <th scope="col" width="15%">
                    SUB Category
                  </th>
                  <th scope="col" width="15%">
                    Units
                  </th>
                </tr>
              </thead>

              <tbody>
                {items &&
                  Object.values(items).map((item) => {
                    let itemUnits = Object.entries(item.units);

                    return (
                      <tr key={item.product_id}>
                        <td>{item.product_id}</td>
                        <td>{item.category}</td>
                        <td>{item.category_type}</td>
                        <td>{item.subcategory}</td>
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
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}

          <br />

          <PaginationSection {...newProps} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default MainSection;
