import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "./Tables/template";
import DetailTable from "./Tables/detail";
import LayoutContainer from "../../Layout";

// Actions
import {
  fetchFormDetailsData,
  updateFormDetails,
} from "../../../redux/actions";

// Styling
import "../../../assets/scss/templates.scss";

const initialState = {
  isMounted: false,
  detailArrs: [],
  templateItems: [],
  unitItems: [],
  detailItems: [],
  selectedItems: [],
  pageNumber: 1,
  pageSize: 15,
};

class FormEdit extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleRemoveAllData = this.handleRemoveAllData.bind(this);
    this.handleFetchSelectedData = this.handleFetchSelectedData.bind(this);

    this.handleSaveBtn = this.handleSaveBtn.bind(this);
  }

  async componentDidMount() {
    return new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => this.handlePagination())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  handleFetchData = async (page = 1) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { fetchFormDetailsData, match } = this.props;
        let params = {
          ...match.params,
          page,
        };

        fetchFormDetailsData(params);
      })
      .then(() => this.setState({ detailItems: this.props.details.data.items }))
      .then(() => this.handleFetchSelectedData());
  };

  processSelectedItems = (items) => {
    const uniqueKey = (data) =>
      `${data.product_id}_${data.product_code}_${data.unit}`;

    this.setState((prevState) => {
      // Retrieve existing selectedItems
      const existingItems = new Map(
        prevState.selectedItems.map((item) => [uniqueKey(item), item])
      );

      // Add new items from the input
      Object.values(items).forEach((item) => {
        item.units.forEach((unit) => {
          const newData = {
            product_id: item.product_id,
            product_name: item.product_name,
            product_code: item.product_code,
            ...unit,
          };

          existingItems.set(uniqueKey(newData), newData);
        });
      });

      // Convert Map back to an array
      return { selectedItems: Array.from(existingItems.values()) };
    });
  };

  handleFetchSelectedData = () =>
    this.processSelectedItems(this.state.detailItems);

  handlePagination = (page = 1) => {
    const { detailItems, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;

    let currentItems = detailItems.slice(start, end);

    // Check current page
    if (!currentItems.length > 0 && page > 1) {
      return this.handlePagination(page - 1);
    }

    this.setState({
      detailArrs: currentItems,
      pageNumber: page,
    });
  };

  handleClick = async (item, selectedUnit) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { detailItems } = this.state;

        let currentUnit = item.units[selectedUnit];

        let newObj = Object.assign({}, item);

        newObj.units = [
          {
            unit: selectedUnit,
            unit_value: currentUnit.value,
            unit_sku: currentUnit.sku,
          },
        ];

        let newItems = [...new Set([...[newObj], ...detailItems])];

        let mergedItems = Array.from(
          newItems
            .reduce((map, item) => {
              const key = `${item.product_id}`;

              if (!map.has(key)) {
                // Add a new item to the map if it doesn't already exist
                map.set(key, { ...item, units: [...item.units] });
              } else {
                // Merge units with the existing item
                let existingItem = map.get(key);
                existingItem.units = [...existingItem.units, ...item.units];

                // Remove duplicates from units
                existingItem.units = [
                  ...new Map(
                    existingItem.units.map((unit) => [
                      `${unit.unit}_${unit.unit_value}_${unit.unit_sku}`,
                      unit,
                    ])
                  ).values(),
                ];

                // Sort units by unit_value in descending order
                existingItem.units.sort((a, b) => b.unit_value - a.unit_value);
              }

              return map;
            }, new Map())
            .values()
        );

        this.setState({ detailItems: mergedItems });
      })
      .then(() => this.handlePagination())
      .then(() => {
        this.processSelectedItems(this.state.detailItems);
      });
  };

  handleRemoveAllData = async () => {
    return new Promise((resolve) => resolve()).then(() => {
      this.setState(initialState);
    });
  };

  handleRemoveData = async (item, pageNumber) => {
    const { detailItems, selectedItems } = this.state;

    return new Promise((resolve) => resolve())
      .then(() => {
        let filteredItems = detailItems.filter((target) => {
          return target.product_code != item.product_code;
        });

        this.setState({
          detailArrs: filteredItems,
          detailItems: filteredItems,
        });
      })
      .then(() => this.handlePagination(pageNumber))
      .then(() => {
        let filteredItems = selectedItems.filter(
          (target) => target.product_code != item.product_code
        );

        this.setState({ selectedItems: filteredItems });
      });
  };

  handleSaveBtn = (e) => {
    e.preventDefault();

    let { updateFormDetails, details } = this.props;
    let { data } = details;

    let { selectedItems } = this.state;

    let params = {
      form_id: parseInt(data.id),
      outlet_id: parseInt(data.outlet_id),
      items: selectedItems,
    };

    updateFormDetails(params);
  };

  render() {
    const {
      isMounted,
      selectedItems,
      detailItems,
      detailArrs,
      pageNumber,
      pageSize,
    } = this.state;

    const { details } = this.props;
    const { data } = details;

    let templateProps = {
      handleClick: this.handleClick,
      selectedItems,
    };

    let detailProps = {
      handleRemoveAllData: this.handleRemoveAllData,
      handleRemoveData: this.handleRemoveData,
      handlePagination: this.handlePagination,
      handleSaveBtn: this.handleSaveBtn,
      detailItems,
      detailArrs,
      pageNumber,
      pageSize,
      isMounted,
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Form Edit - {data?.staff?.name}</h4>
          </div>

          <div className="template-edit-container card-container">
            <div className="row">
              <TemplateTable {...templateProps} />
              <DetailTable {...detailProps} />
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.form.data,
  templatesDetails: state.template.data,
});
const mapDispatchToProps = (dispatch) => ({
  fetchFormDetailsData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormDetailsData(params)).then(() => resolve());
    });
  },
  updateFormDetails: (params) => {
    return new Promise((resolve) => {
      dispatch(updateFormDetails(params)).then(() => resolve());
    });
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormEdit);
