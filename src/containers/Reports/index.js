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
import { fetchWasteByTemplateApi } from "../../apis";

// Helpers
import { debounce } from "../../utils/helpers";

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
  code: "",
};

const initialState = {
  isMounted: false,
  currentSelect: null,
  selection: {},
  items: {},
  notes: "",
};

class ReportContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddNewClick = this.handleAddNewClick.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleOptionsClick = this.handleOptionsClick.bind(this);
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

  handleAddNewClick = (e, itemKey) => {
    e.preventDefault();

    const { items } = this.state;

    let targetItems = items[itemKey].items;
    let itemsArr = itemKey == "additional" ? defaultItems : defaultCodeItems;
    let initial = Object.assign({}, itemsArr);
    let newItems = [...targetItems, initial];

    // focus on new input
    let targetElem = e.target.parentNode.querySelector(".report-wrapper");
    let childCount = targetElem.children.length;

    setTimeout(() => {
      targetElem.childNodes
        .item(childCount)
        .querySelector(".product_name")
        .focus();
    }, 100);

    this.proceedAddOrRemove(itemKey, newItems);
  };

  handleRemove = (e, itemKey, index) => {
    e.preventDefault();

    const { items } = this.state;

    let targetItems = items[itemKey].items.filter((item, itemIndex) => {
      return itemIndex !== index;
    });

    let newItems = [...targetItems];

    this.proceedAddOrRemove(itemKey, newItems);
  };

  proceedAddOrRemove = (itemKey, newItems) => {
    this.proceedResult(itemKey, newItems);
  };

  proceedChange = ({ itemKey, index, items, name, value }) => {
    const targetItems = items[itemKey].items;
    const targetItem = targetItems[index];

    let itemTarget = {
      ...targetItem,
      [name]: value,
    };

    targetItems[index] = itemTarget;

    this.proceedResult(itemKey, targetItems);
  };

  proceedResult = (itemKey, resultItems) => {
    let params = {
      ...this.state,
      items: {
        ...this.state.items,
        [itemKey]: {
          ...this.state.items[itemKey],
          items: resultItems,
        },
      },
    };

    this.setState(params);
  };

  handleOptionsClick = (e, itemKey, index, selected) => {
    e.preventDefault();

    const { items } = this.state;

    const targetItems = items[itemKey].items;
    const targetItem = targetItems[index];

    new Promise((resolve) => resolve())
      .then(() => {
        let itemTarget = {
          ...targetItem,
          name: selected.product_name,
          code: selected.product_code,
          unit: selected.product_sku,
        };

        targetItems[index] = itemTarget;

        // Filter out same options
        let resultItems = targetItems.filter((elem, elemIndex) => {
          let targetIndex = targetItems.findIndex(
            (el) => el.code === elem.code && el.name == elem.name
          );

          return elemIndex == targetIndex;
        });

        this.proceedResult(itemKey, resultItems);
      })
      .then(() => {
        this.setState({ selection: {} });
      });
  };

  handleNameChange = (e, itemKey, index) => {
    e.preventDefault();

    const { items } = this.state;

    const target = e.target;
    const { name, value } = target;

    new Promise((resolve) => resolve())
      .then(() => this.proceedChange({ itemKey, index, items, name, value }))
      .then(
        debounce(async () => {
          if (value.length == 0) {
            this.setState({ selection: {} });
            return;
          }

          if (!(value.length > 2)) return;

          const result = await fetchWasteByTemplateApi({
            templateId: 1,
            query: value,
          });

          this.setState({ currentSelect: index, selection: result.data });
        }, 500)
      );
  };

  handleNumberChange = (e, itemKey, index) => {
    e.preventDefault();

    const { items } = this.state;

    const target = e.target;
    const { name, value } = target;

    const re = /^[0-9\b]+$/; //rules

    if (re.test(e.target.value)) {
      this.proceedChange({ itemKey, index, items, name, value });
    }
  };

  handleChange = (e, itemKey, index) => {
    e.preventDefault();

    const { items } = this.state;

    const target = e.target;
    const { name, value } = target;

    this.proceedChange({ itemKey, index, items, name, value });
  };

  handleNotesChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  };

  render() {
    const { isMounted, items, notes, selection, currentSelect } = this.state;
    const entries = Object.entries(items);

    const ContentSection = (
      <div className="container">
        <div className="col-lg-8 col-12 pt-2 pb-5 mx-auto">
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
                    let customItem = (
                      <div className="custom-options-container">
                        <input
                          className="product_name"
                          placeholder="Product Name"
                          name="name"
                          type="text"
                          value={item.name}
                          disabled={item.unit_disabled}
                          onChange={(e) =>
                            item.unit_disabled == false
                              ? this.handleNameChange(e, itemKey, index)
                              : null
                          }
                        />

                        {!item.unit_disabled &&
                          selection.length > 0 &&
                          index == currentSelect && (
                            <div className="custom-options-wrapper">
                              {selection.map((selected) => {
                                let selectKey = `${itemKey}.${selected.product_code}`;

                                return (
                                  <div
                                    key={selectKey}
                                    className="custom-option"
                                    onClick={(e) =>
                                      this.handleOptionsClick(
                                        e,
                                        itemKey,
                                        index,
                                        selected
                                      )
                                    }
                                  >
                                    {selected.product_name}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    );

                    let defaultItem = (
                      <input
                        className="product_name"
                        placeholder="Product Name"
                        name="name"
                        type="text"
                        value={item.name}
                        disabled={item.name_disabled}
                        onChange={(e) =>
                          item.unit_disabled == false
                            ? this.handleChange(e, itemKey, index)
                            : null
                        }
                      />
                    );

                    return (
                      <div
                        className="report-details"
                        key={`${itemKey}.${item.code}.${index}`}
                      >
                        <div className="pe-3 product_index">{index + 1}</div>

                        {itemKey !== "additional" ? customItem : defaultItem}

                        <input
                          className="product_code"
                          placeholder="Product Code"
                          name="code"
                          type="text"
                          value={item.code}
                          disabled
                        />

                        <input
                          className="product_unit"
                          placeholder="Unit"
                          name="unit"
                          type="text"
                          value={item.unit}
                          disabled={itemKey == "waste" || item.unit_disabled}
                          onChange={(e) =>
                            item.unit_disabled == false
                              ? this.handleNumberChange(e, itemKey, index)
                              : null
                          }
                        />

                        <input
                          className="product_value"
                          placeholder="Value"
                          name="value"
                          type="text"
                          value={item.value}
                          disabled={item.value_disabled}
                          onChange={(e) =>
                            item.value_disabled == false
                              ? this.handleNumberChange(e, itemKey, index)
                              : null
                          }
                        />

                        <input
                          className="product_file"
                          name="file"
                          type="file"
                          value={item.file}
                          disabled={item.unit_disabled}
                          onChange={(e) =>
                            item.unit_disabled == false
                              ? this.handleChange(e, itemKey, index)
                              : null
                          }
                        />

                        <a
                          className="btn btn-danger product_remove"
                          onClick={(e) => this.handleRemove(e, itemKey, index)}
                        >
                          X
                        </a>
                      </div>
                    );
                  })}
                </div>

                <a
                  className="btn btn-primary ms-4"
                  onClick={(e) => this.handleAddNewClick(e, itemKey)}
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
    );

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Daily Report</h4>
          </div>

          {!isMounted ? <Loader /> : ContentSection}
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
