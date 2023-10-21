import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../sections/Main";

// Components
import Loader from "../../components/Loader";

// Containers
import LayoutContainer from "../Layout";

// Actions
import { fetchReportsData } from "../../redux/actions";

// Styling
import "../../assets/scss/report.scss";

const defaultItems = {
  name: "",
  unit: "",
  value: "",
  file: "",
  name_disabled: false,
  unit_disabled: false,
  value_disabled: false,
  file_disabled: false,
};
const defaultCodeItems = {
  ...defaultItems,
  code: "kode",
};

const initialState = {
  isMounted: false,
  items: {},
  notes: "",
};

class ReportContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(async () => {
        const { fetchReportsData } = this.props;

        await fetchReportsData();
      })
      .then(() => {
        const { reports } = this.props;
        const { items, notes } = reports;

        this.setState({ items, notes });
      })
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleClick = (e, itemKey) => {
    e.preventDefault();

    const { items } = this.state;

    let targetItems = items[itemKey].items;
    let itemsArr = itemKey == "additional" ? defaultItems : defaultCodeItems;
    let initial = Object.assign({}, itemsArr);
    let newItems = [...targetItems, initial];
    let params = {
      ...this.state,
      items: {
        ...this.state.items,
        [itemKey]: {
          ...this.state.items[itemKey],
          items: newItems,
        },
      },
    };

    this.setState(params);
  };

  handleRemove = (e, itemKey, index) => {
    e.preventDefault();

    const { items } = this.state;

    let targetItems = items[itemKey].items.filter((item, itemIndex) => {
      return itemIndex !== index;
    });

    let newItems = [...targetItems];
    let params = {
      ...this.state,
      items: {
        ...this.state.items,
        [itemKey]: {
          ...this.state.items[itemKey],
          items: newItems,
        },
      },
    };

    this.setState(params);
  };

  handleChange = (e, itemKey, index) => {
    e.preventDefault();

    const { items } = this.state;

    const target = e.target;
    const name = target.name;
    const value = target.value;

    const targetItems = items[itemKey].items;
    const targetItem = targetItems[index];

    let itemTarget = {
      ...targetItem,
      [name]: value,
    };

    targetItems[index] = itemTarget;

    let params = {
      ...this.state.items,
      [itemKey]: {
        ...this.state.items[itemKey],
        items: targetItems,
      },
    };

    this.setState(params);
  };

  handleNotesChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isMounted, items, notes } = this.state;

    if (!isMounted)
      return (
        <LayoutContainer>
          <MainSection>
            <Loader />
          </MainSection>
        </LayoutContainer>
      );

    const entries = Object.entries(items);

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Daily Report</h4>
          </div>

          <div className="container">
            <div className="col-md-8 col-12 pt-2 pb-5 mx-auto">
              {entries.map((entry) => {
                let itemKey = entry[0];
                let items = entry[1].items;

                return (
                  <div
                    key={itemKey}
                    className={`report-container ${itemKey}-container`}
                  >
                    <h5>{entry[1].name}</h5>

                    <div className="report-wrapper">
                      {items.map((item, index) => {
                        return (
                          <div className="report-details" key={index}>
                            <div className="pe-3 product_index">
                              {index + 1}
                            </div>
                            <input
                              className="product_name"
                              placeholder="Product Name"
                              name="name"
                              type="text"
                              value={item.name}
                              disabled={item.unit_disabled}
                              onChange={(e) =>
                                item.unit_disabled == false
                                  ? this.handleChange(e, itemKey, index)
                                  : null
                              }
                            />

                            {item.code && (
                              <input
                                className="product_code"
                                placeholder="Product Code"
                                name="code"
                                type="text"
                                value={item.code}
                                disabled
                              />
                            )}

                            <input
                              className="product_unit"
                              placeholder="Unit"
                              name="unit"
                              type="text"
                              value={item.unit}
                              disabled={item.unit_disabled}
                              onChange={(e) =>
                                item.unit_disabled == false
                                  ? this.handleChange(e, itemKey, index)
                                  : null
                              }
                            />

                            <input
                              className="product_value"
                              placeholder="Value"
                              name="value"
                              type="text"
                              value={item.value}
                              disabled={item.unit_disabled}
                              onChange={(e) =>
                                item.unit_disabled == false
                                  ? this.handleChange(e, itemKey, index)
                                  : null
                              }
                            />

                            <input
                              className="product_file"
                              name="file"
                              type="file"
                              value={item.file}
                              disabled={item.unit_disabled}
                            />

                            <a
                              className="btn btn-danger product_remove"
                              onClick={(e) =>
                                this.handleRemove(e, itemKey, index)
                              }
                            >
                              X
                            </a>
                          </div>
                        );
                      })}
                    </div>

                    <a
                      className="btn btn-primary ms-4"
                      onClick={(e) => this.handleClick(e, itemKey)}
                    >
                      + Add New
                    </a>
                  </div>
                );
              })}

              <div className="report-container notes-container">
                <h5>Notes</h5>

                <div className="report-wrapper">
                  <textarea
                    rows="8"
                    name="notes"
                    className="p-2"
                    value={notes}
                    placeholder="Write something..."
                    onChange={(e) => this.handleNotesChange(e)}
                  ></textarea>
                </div>
              </div>

              <a className="btn btn-primary" href="#">
                Submit
              </a>
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  reports: state.reports.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReportsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchReportsData(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ReportContainer);
