import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "../Edit/Tables/template";
import MasterTable from "./Tables/master";
import LayoutContainer from "../../Layout";

// Actions
import {
  fetchTemplateViewData,
  resetTemplateSelectedData,
} from "../../../redux/actions";

// Styling
import "../../../assets/scss/templates.scss";

// Apis
import { updateTemplateForOutletApi } from "../../../apis";

const initialState = {
  isMounted: false,
  templateArrs: [],
  templateItems: [],
  selectedItems: [],
  pageNumber: 1,
  pageSize: 15,
};

class TemplateEdit extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.handleRemoveAllData = this.handleRemoveAllData.bind(this);

    this.handleSaveBtn = this.handleSaveBtn.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => this.handlePagination())
      .then(() => this.processUtilities())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  processUtilities = async () => {
    return new Promise((resolve) => resolve()).then(() => {
      let { templateItems } = this.state;

      let items = Object.keys(templateItems).map(
        (f) => templateItems[f].product_code
      );

      this.setState({ selectedItems: items });
    });
  };

  handleFetchData = async (page = 1) => {
    return new Promise((resolve) => resolve())
      .then(async () => {
        const { fetchTemplateViewData, match } = this.props;
        const { params } = match;
        const { id } = params;

        let parameters = {
          templateId: id,
          page: page,
        };

        await fetchTemplateViewData(parameters);
      })
      .then(() => {
        let { details } = this.props;
        let { data } = details;

        this.setState({ templateItems: data?.details });
      });
  };

  handlePagination = (page = 1) => {
    const { templateItems, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;

    let currentItems = templateItems.slice(start, end);

    // Check current page
    if (!currentItems.length > 0 && page > 1) {
      return this.handlePagination(page - 1);
    }

    this.setState({
      templateArrs: currentItems,
      pageNumber: page,
    });
  };

  handleClick = async (item) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { templateItems } = this.state;

        let newItems = [...[item], ...templateItems];

        this.setState({ templateItems: newItems });
      })
      .then(() => this.handlePagination())
      .then(() => this.processUtilities());
  };

  handleRemoveAllData = async () => {
    return new Promise((resolve) => resolve()).then(() => {
      this.setState(initialState);
    });
  };

  handleRemoveData = async (item, pageNumber) => {
    const { templateItems } = this.state;

    return new Promise((resolve) => resolve())
      .then(() => {
        let filteredItems = templateItems.filter((target) => {
          return target.product_code != item.product_code;
        });

        this.setState({
          templateItems: filteredItems,
        });
      })
      .then(() => this.handlePagination(pageNumber))
      .then(() => this.processUtilities());
  };

  handleSaveBtn = (e) => {
    e.preventDefault();

    let { details } = this.props;
    let { data } = details;

    let { templateItems } = this.state;
    let params = {
      items: JSON.stringify(templateItems),
      id: data.id,
    };

    updateTemplateForOutletApi(params)
      .then((response) => response)
      .then(() => {
        this.props.history.push("/templates");
      });
  };

  render() {
    const { isMounted, templateItems, selectedItems } = this.state;

    const { details } = this.props;
    const { data: templateDetail } = details;

    let masterProps = {
      handleClick: this.handleClick,
      selectedItems,
    };

    let templateProps = {
      handleRemoveAllData: this.handleRemoveAllData,
      handleRemoveData: this.handleRemoveData,
      handlePagination: this.handlePagination,
      handleSaveBtn: this.handleSaveBtn,
      templateItems,
      templateDetail,
      isMounted,
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Template Edit - ( {templateDetail?.title} )</h4>
          </div>

          <div className="template-edit-container card-container">
            <div className="row">
              <MasterTable {...masterProps} />
              <TemplateTable {...templateProps} />
            </div>
          </div>
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.template.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTemplateViewData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateViewData(params)).then(() => resolve());
    });
  },
  resetTemplateSelectedData: (params) => {
    dispatch(resetTemplateSelectedData(params));
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplateEdit);
