import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { toast } from "react-toastify";

// Components
import Loader from "../../../components/Loader";

// Sections
import PaginationSection from "../../../sections/Pagination";

// Actions
import {
  fetchFormByStaffData,
  createDailyFormReport,
} from "../../../redux/actions";

const initialState = {
  isMounted: false,
  items: [],
  itemsArr: [],
  pageNumber: 1,
  pageSize: 15,
};

class TestingFormItems extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    let isMounted = true; // Track the mounted status

    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        if (isMounted) {
          // Check if the component is still mounted
          setTimeout(() => this.setState({ isMounted: true }), 500);
        }
      });

    // Set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }

  handlePagination = (page = 1) => {
    const { items, itemsArr, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;

    let currentItems = itemsArr?.slice(start, end);

    this.setState({
      items: {
        ...items,
        data: {
          ...items.data,
          items: currentItems,
        },
      },
      pageNumber: page,
    });
  };

  handleFetchData = (page = 1) => {
    new Promise((resolve) => resolve()).then(async () => {
      let { fetchFormByStaffData, managerId, staffId } = this.props;
      let parameters = {
        managerId,
        staffId,
        page,
      };

      await fetchFormByStaffData(parameters).then(() => {
        let arrs = [
          ...this.state.itemsArr,
          ...this.props.testingForms.data.items,
        ];

        let itemsArr = [];

        arrs.forEach(function (arr) {
          if (!itemsArr.some((x) => x.id === arr.id)) {
            itemsArr.push(arr);
          }
        });

        this.setState(
          {
            items: this.props.testingForms,
            itemsArr,
          },
          () => this.handlePagination()
        );
      });
    });
  };

  proceedChange = (value, index, item) => {
    let { items, itemsArr } = this.state;
    let { data } = items;
    let { items: stateItems } = data;

    let selectedItem = stateItems[index];

    selectedItem.unit_value = value;

    let newItems = [...stateItems, selectedItem];
    let newItemsArr = [
      ...new Map(newItems.map((item) => [item["id"], item])).values(),
    ];

    let newState = {
      ...items,
      data: {
        ...data,
        items: [...newItemsArr],
      },
    };

    let selectedItemArr = itemsArr.filter((i) => i.id == item.id)[0];

    selectedItemArr.unit_value = value;

    let formatedItems = [...itemsArr, selectedItemArr];
    let formatedItemsArr = [
      ...new Map(formatedItems.map((item) => [item["id"], item])).values(),
    ];

    this.setState({
      items: newState,
      itemsArr: formatedItemsArr,
    });
  };

  handleChange = (e, index, item) => {
    e.preventDefault();

    let target = e.target;
    let value = parseInt(target.value !== "" ? target.value : 0);

    const re = /^[0-9\b]+$/; //rules

    if (re.test(value)) {
      this.proceedChange(value, index, item);
    } else {
      toast.error("Please input number only");
    }
  };

  handleFocus = (e) => {
    var that = e.target;

    setTimeout(function () {
      that.selectionStart = that.selectionEnd = 10000;
    }, 300);
  };

  handleSubmit = (e, params) => {
    e.preventDefault();

    let { createDailyFormReport } = this.props;

    createDailyFormReport(params);
  };

  render() {
    const { isMounted, items, itemsArr, pageNumber, pageSize } = this.state;
    const { date } = this.props;

    if (!items) return <>Nothing...</>;

    const { data } = items;

    if (!data) return <></>;

    const { items: listItems, form } = data;

    const newProps = {
      totalCount: itemsArr.length,
      pageNumber,
      pageSize,
      handlePagination: this.handlePagination,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const last_page = Math.ceil(itemsArr.length / pageSize);

    const argParams = {
      formId: form.id,
      items: JSON.stringify(itemsArr),
      date,
    };

    const ContentItems = (
      <div className="template-view-section small overflow-hidden">
        <div
          className={`table-container ${last_page > 1 ? "has-pagination" : ""}`}
        >
          <table className="table table-striped table-sm desktop-main-data">
            <thead>
              <tr>
                <th className="product-no">No.</th>
                <th className="product-code">Code</th>
                <th className="product-name">Name</th>
                <th className="product-value">Value</th>
                <th className="product-unit">Unit</th>
              </tr>
            </thead>

            <tbody>
              {listItems &&
                listItems.length > 0 &&
                listItems.map((d, i) => {
                  let selected = itemsArr.filter((item) => item.id === d.id)[0];

                  return (
                    <tr key={d.id}>
                      <td>{i + 1 + (pageNumber - 1) * pageSize}</td>
                      <td>{d.product_code}</td>
                      <td className="product-name">
                        <div className="product-name-division">
                          {d.product_name}
                        </div>
                      </td>
                      <td className="product-value">
                        <input
                          value={selected.unit_value}
                          onFocus={(e) => this.handleFocus(e)}
                          onChange={(e) => this.handleChange(e, i, d)}
                        />
                      </td>
                      <td>{d.unit}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div
          className={`d-flex justify-content-between align-items-center pagination-container ${
            !(last_page > 1) ? "no-pagination" : ""
          }`}
        >
          {hasPagination(last_page)}

          <button
            className="btn btn-primary"
            style={{ height: "38px" }}
            onClick={(e) => this.handleSubmit(e, argParams)}
          >
            Submit
          </button>
        </div>
      </div>
    );

    return <>{!isMounted ? <Loader /> : ContentItems}</>;
  }
}

const mapStateToProps = (state) => ({
  testingForms: state.testingForms.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFormByStaffData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormByStaffData(params)).then(() => resolve());
    });
  },

  createDailyFormReport: (params) => {
    return new Promise((resolve) => {
      dispatch(createDailyFormReport(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TestingFormItems);
