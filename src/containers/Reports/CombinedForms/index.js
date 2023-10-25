import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";
import PaginationSection from "../../../sections/Pagination";

// Components
import Loader from "../../../components/Loader";

// Containers
import LayoutContainer from "../../Layout";

// Actions
import { fetchCombinedFormsData } from "../../../redux/actions";

// Styling
import "../../../assets/scss/combined.scss";

const initialState = {
  isMounted: false,
};

class CombinedFormsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchData = async (page = 1) => {
    let { fetchCombinedFormsData, match } = this.props;
    let parameters = {
      ...match.params,
      page,
    };

    fetchCombinedFormsData(parameters);

    window.scrollTo(0, 0);
  };

  render() {
    const { isMounted } = this.state;
    const { combinedFormsData } = this.props;
    const { data } = combinedFormsData;

    const { total, current_page, per_page, last_page } = combinedFormsData;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const dataItems = data?.items.map((item, index) => {
      return (
        <div key={item.id} className="combined-container">
          <div className="combined-wrapper">
            <div className="product_index">
              {index + 1 + (current_page - 1) * per_page}
            </div>
            <input
              className="product_name"
              type="text"
              value={item.product_name}
              disabled
            />
            <input
              className="product_code"
              type="text"
              value={item.product_code}
              disabled
            />
            <input
              className="product_value"
              type="text"
              value={item.value}
              disabled
            />
            <input
              className="product_sku"
              type="text"
              value={item.unit_sku}
              disabled
            />
          </div>
        </div>
      );
    });

    const noteItems = data?.notes.map((note) => {
      return (
        <div key={note.id} className="note-container">
          <div className="note-wrapper">
            <div className="note-staff-container">{note.staff.name}</div>
            <div className="note-item">{note.notes}</div>
          </div>
        </div>
      );
    });

    const ContentSection = (
      <>
        <div className="d-flex">
          <div className="col-6 pt-2 pe-2">
            <div className="section-container">
              <h6>Combined Form Items</h6>
              <div className="combined-section">
                {dataItems}

                {hasPagination(last_page)}
              </div>
            </div>
          </div>

          <div className="col-6 pt-2 ps-2">
            <div className="section-container">
              <h6>Notes dari Staff</h6>
              <div className="note-section">{noteItems}</div>
            </div>
          </div>
        </div>

        <div className="col-12 pt-1 pb-3">
          <button className="btn btn-primary">Compare</button>
        </div>
      </>
    );

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom">
            <h4 className="h4">Combined Forms</h4>
          </div>

          {!isMounted ? <Loader /> : ContentSection}
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  combinedFormsData: state.combinedForms?.data,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCombinedFormsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchCombinedFormsData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CombinedFormsContainer);
