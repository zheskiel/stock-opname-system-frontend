import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../../components/Loader";

// Sections
import MainSection from "../../../sections/Main";
import PaginationSection from "../../../sections/Pagination";

// Containers
import LayoutContainer from "../../Layout";

// Actions
import { fetchFinalFormsData } from "../../../redux/actions";

//  Styling
import "../../../assets/scss/final_form.scss";

const initialState = {
  isMounted: false,
};

class FinalForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => setTimeout(() => this.setState({ isMounted: true }), 500));
  }

  handleFetchData = (page = 1) => {
    new Promise((resolve) => resolve()).then(async () => {
      let { fetchFinalFormsData } = this.props;
      let parameters = {
        page,
      };

      await fetchFinalFormsData(parameters);

      window.scrollTo(0, 0);
    });
  };

  render() {
    const { isMounted } = this.state;
    const { finalData } = this.props;
    const { data } = finalData;

    const ContentItems = () => {
      const { total, current_page, per_page, last_page } = finalData;
      const newProps = {
        totalCount: total,
        pageNumber: current_page,
        pageSize: per_page,
        handlePagination: this.handleFetchData,
      };

      const hasPagination = (lastPage) => {
        return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
      };

      const dataItems =
        data &&
        data.map((item, index) => {
          let calculatedResult = item.calculated;

          return (
            <tr key={item.product_code} className="final-form-body">
              <td className="product_index">
                {index + 1 + (current_page - 1) * per_page}
              </td>

              <td className="header-title product_name">
                <input type="text" value={item.product_name} disabled />
              </td>

              <td className="header-title product_code">
                <input type="text" value={item.product_code} disabled />
              </td>

              <td className="header-title product_sku">
                <input type="text" value={item.unit_sku} disabled />
              </td>

              <td className="header-title product_stock_position_value">
                <input
                  type="text"
                  value={item.items.stockPosition.value}
                  disabled
                />
              </td>

              <td className="header-title product_waste_value">
                <input type="text" value={item.items.waste.value} disabled />
              </td>

              <td className="header-title product_combined_form_value">
                <input
                  type="text"
                  value={item.items.combinedForm.value}
                  disabled
                />
              </td>

              <td className="header-title product_calculated_value">
                <input
                  type="text"
                  value={
                    calculatedResult > 0
                      ? `+ ${calculatedResult}`
                      : `${calculatedResult}`
                  }
                  disabled
                />
              </td>

              <td className="header-title product_result_value">
                <input type="text" placeholder="Stock Opname Value" />
              </td>

              <td className="header-title product_actions">
                <button className="me-2">View</button>
                <button>Notes</button>
              </td>
            </tr>
          );
        });

      return (
        <div className="final-form-section">
          <div className="final-form-table-container">
            <table className="final-form-container mb-3">
              <thead>
                <tr className="final-form-header">
                  <th className="product_index">ID</th>
                  <th className="header-title product_name">Product Name</th>
                  <th className="header-title product_code">Product Code</th>
                  <th className="header-title product_sku">Unit</th>
                  <th className="header-title product_stock_position_value">
                    Stock Position
                  </th>
                  <th className="header-title product_waste_value">Waste</th>
                  <th className="header-title product_combined_form_value">
                    Combined Form
                  </th>
                  <th className="header-title product_calculated_value">
                    Calculated
                  </th>
                  <th className="header-title product_result_value">Value</th>
                  <th className="header-title product_actions" colSpan="2">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>{dataItems}</tbody>
            </table>
          </div>

          <div className="lower-section mb-3">{hasPagination(last_page)}</div>
        </div>
      );
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Final Form</h4>
          </div>

          <>{!isMounted && !data ? <Loader /> : <ContentItems />}</>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  finalData: state.finalForm.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFinalFormsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFinalFormsData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FinalForm);
