import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Action
import { createStockPosition } from "../../../../../redux/actions";

// Styling
import "../../../../../assets/scss/compare_stock_upload.scss";

const initialState = {
  isMounted: false,
  file: null,
};

class StockPositionUpload extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange = (e) => {
    e.preventDefault();

    let target = e.target;
    let file = target.files[0];

    this.setState({ file });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    new Promise((resolve) => resolve())
      .then(async () => {
        const { file } = this.state;
        const { createStockPosition } = this.props;

        await createStockPosition(file);
      })
      .then(() => this.props.fetchData());
  };

  render() {
    return (
      <div className="stock-position-section">
        <div className="stock-position-upload-section">
          <div className="mb-3 stock-position-container">
            <label className="form-label">Upload File</label>

            <div className="stock-input-container text-center">
              <input
                type="file"
                className="form-control mb-3"
                placeholder="Upload Stock Position Report"
                name="stock_file"
                onChange={(e) => this.handleFileChange(e)}
              />
              <a
                className="btn btn-primary mx-auto"
                onClick={(e) => this.handleSubmit(e)}
              >
                Upload
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createStockPosition: (params) => {
    return new Promise((resolve) => {
      dispatch(createStockPosition(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(StockPositionUpload);
