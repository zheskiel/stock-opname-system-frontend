import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Components
import BtnLoader from "../../../components/Loader/btn";

// Containers
import LayoutContainer from "../../Layout";
import CombinedItems from "./CombinedForms";
import WasteReport from "./waste";
import StockPositionReport from "./StockPositionReport";

// Actions
import { CreateFinalFormsData } from "../../../redux/actions";

const initialState = {
  btnLoading: false,
};

class CompareFormsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();

    new Promise((resolve) => resolve())
      .then(() => this.setState({ btnLoading: true }))
      .then(() => this.props.CreateFinalFormsData())
      .then(() => {
        const { history, match } = this.props;
        const { url } = match;

        let newUrl = url.replace("compare", "final");

        history.push(newUrl);
      })
      .then(() => this.setState({ btnLoading: false }));
  };

  render() {
    const { btnLoading } = this.state;

    const BtnComponent = () => {
      return (
        <button
          className="btn btn-primary"
          onClick={(e) => this.handleClick(e)}
        >
          Final Form
        </button>
      );
    };

    const ContentSection = (
      <>
        <div className="d-flex mb-3">
          <div className="col-4">
            <div className="section-container">
              <h6>Combined Forms</h6>

              <CombinedItems />
            </div>
          </div>

          <div className="col-4">
            <div className="section-container">
              <h6>Stock Position Report</h6>

              <StockPositionReport />
            </div>
          </div>

          <div className="col-4">
            <div className="section-container">
              <h6>Waste</h6>

              <WasteReport />
            </div>
          </div>
        </div>

        {btnLoading ? <BtnLoader /> : <BtnComponent />}
      </>
    );

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Compare Forms</h4>
          </div>

          {ContentSection}
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  CreateFinalFormsData: () => {
    return new Promise((resolve) => {
      dispatch(CreateFinalFormsData()).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CompareFormsContainer);
