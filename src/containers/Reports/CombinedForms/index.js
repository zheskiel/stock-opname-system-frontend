import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";
import PaginationSection from "../../../sections/Pagination";

// Components
import Loader from "../../../components/Loader";
import BtnLoader from "../../../components/Loader/btn";
import Progress from "../../../components/Progress";

// Containers
import LayoutContainer from "../../Layout";

// Actions
import { fetchCombinedFormsData } from "../../../redux/actions";

// Styling
import "../../../assets/scss/combined.scss";
import { sleep } from "../../../utils/helpers";

const initialState = {
  isMounted: false,
  btnLoading: false,
};

class CombinedFormsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    let isMounted = true; // Track the mounted status

    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        isMounted
          ? setTimeout(() => this.setState({ isMounted: true }), 500)
          : null;
      });

    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }

  handleFetchData = async (page = 1) => {
    let { fetchCombinedFormsData, match } = this.props;
    let parameters = {
      ...match.params,
      page,
    };

    await fetchCombinedFormsData(parameters);
  };

  handleClick = (e) => {
    e.preventDefault();

    new Promise((resolve) => resolve())
      .then(async () => {
        this.setState({ btnLoading: true });

        await sleep(1000);
      })
      .then(() => this.props.history.push("/report/1/outlet/1/compare"));
  };

  render() {
    const { isMounted, btnLoading } = this.state;
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

    const BtnComponent = () => {
      return (
        <button
          className="btn btn-primary"
          onClick={(e) => this.handleClick(e)}
        >
          Compare
        </button>
      );
    };

    const ContentSection = (
      <>
        <div className="d-flex">
          <div className="col-6 pt-2 pe-2">
            <div className="section-container">
              <h6>Combined Form Items</h6>
              <div className="combined-section">
                <div
                  className={`combined-inner-wrapper ${
                    last_page > 1 ? "has-pagination" : ""
                  }`}
                >
                  {dataItems}
                </div>

                {hasPagination(last_page)}
              </div>
            </div>
          </div>

          <div className="col-6 pt-2 ps-2">
            <div className="section-container">
              <h6>Staff's Note</h6>
              <div className="note-section">{noteItems}</div>
            </div>
          </div>
        </div>

        <div className="col-12 pt-3 pb-3">
          {btnLoading ? <BtnLoader /> : <BtnComponent />}
        </div>
      </>
    );

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Combined Forms</h4>
          </div>

          <Progress active={`combined`} />

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
