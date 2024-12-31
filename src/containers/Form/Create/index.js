import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Sections
import MainSection from "../../../sections/Main";

// Containers
import TemplateTable from "../Create/Tables/template";
import DetailTable from "./Tables/detail";
import LayoutContainer from "../../Layout";

// Apis
import {
  fetchManagersApi,
  fetchOutletByManagerApi,
  fetchSupervisorByManagerApi,
  fetchTemplatesByManagerApi,
  fetchStaffsBySupervisorApi,
} from "../../../apis";

// Actions
import {
  fetchTemplateViewData,
  fetchFormDetailsSelectedData,
  createFormDetails,
  createNewFormDetails,
  resetFormSelected,
  resetTemplateViewData,
} from "../../../redux/actions";

// Array Data
import { typeOneArrs as arrs } from "../../../constants/arrays";

// Styling
import "../../../assets/scss/templates.scss";

import {
  sortData,
  buildItemsObj,
  isAdministrator,
  isManager,
  isSupervisor,
} from "../../../utils/helpers";

const initialState = {
  items: {},
  sort: "id",
  isDesc: true,
  order: "desc",
  orderList: ["asc", "desc"],
  detailArrs: [],
  detailItems: [],
  detailFitered: [],
  selectedItems: [],
  units: [],
  pageNumber: 1,
  pageSize: 15,
  managerItems: [],
  outletItems: [],
  supervisorItems: [],
  templateItems: [],
  staffItems: [],
  selectedManager: undefined,
  selectedOutlet: undefined,
  selectedSupervisor: undefined,
  selectedTemplate: undefined,
  selectedStaff: undefined,
};

let order = 0;

class FormCreate extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveData = this.handleRemoveData.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleRemoveAllData = this.handleRemoveAllData.bind(this);

    this.handleFetchOutlet = this.handleFetchOutlet.bind(this);
    this.handleFetchManager = this.handleFetchManager.bind(this);
    this.handleFetchTemplate = this.handleFetchTemplate.bind(this);
    this.handleFetchSupervisor = this.handleFetchSupervisor.bind(this);

    this.handleOutletChange = this.handleOutletChange.bind(this);
    this.handleManagerChange = this.handleManagerChange.bind(this);
    this.handleSupervisorChange = this.handleSupervisorChange.bind(this);

    this.handleFetchTemplateData = this.handleFetchTemplateData.bind(this);
    this.handleTemplatePagination = this.handleTemplatePagination.bind(this);
    this.handleBeforeManagerChange = this.handleBeforeManagerChange.bind(this);
    this.handleBeforeTemplateChange =
      this.handleBeforeTemplateChange.bind(this);

    this.handleSaveBtn = this.handleSaveBtn.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.setState({ items: buildItemsObj(arrs) }))
      .then(() => {
        const { auth, formSelected } = this.props;
        const { user } = auth;

        const { selectedManager } = formSelected;

        if (isAdministrator()) {
          this.handleFetchManager(selectedManager);
        } else if (isManager()) {
          var manager = selectedManager ?? user.id;

          this.setState({ selectedManager: manager }, () => {
            this.handleFetchOutlet(manager);
            this.handleFetchTemplate(manager);
          });
        } else if (isSupervisor()) {
          var manager = selectedManager ?? user.manager_id;

          this.setState({ selectedManager: manager }, () => {
            this.handleFetchOutlet(manager);
            this.handleFetchTemplate(manager);
          });
        }
      })
      .then(() => this.handlePagination())
      .then(() => setTimeout(() => this.handleFetchTemplateData(), 1000));
  }

  componentWillUnmount() {
    this.props.resetFormSelected();
  }

  handleBeforeTemplateChange = async (e) => {
    let target = e.target;
    let value = target.value;

    return new Promise((resolve) => resolve())
      .then(() => this.setState({ selectedTemplate: value }))
      .then(() => this.handleRemoveAllData())
      .then(() => this.handleFetchTemplateData());
  };

  handleFetchTemplateData = async (
    page = 1,
    sort = "id",
    order = "desc",
    isDesc = true
  ) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { items } = this.state;
        let params = { sort, order, isDesc };

        this.setState(params);
        this.setState({
          items: {
            ...items,
            [sort]: params,
          },
        });
      })
      .then(async () => {
        let { items, selectedTemplate } = this.state;

        if (!items) return;

        let { sort: sortState, order: orderState } = items[sort];

        const { fetchTemplateViewData } = this.props;

        if (!selectedTemplate) return;

        let parameters = {
          sort: sortState,
          order: orderState,
          templateId: selectedTemplate ?? undefined,
          withLimit: 1,
          page,
        };

        await fetchTemplateViewData(parameters);
      });
  };

  handleTemplatePagination = async (page) => {
    return new Promise((resolve) => resolve()).then(() => {
      let { sort, order, isDesc } = this.state;

      this.handleFetchTemplateData(page, sort, order, isDesc);
    });
  };

  handleFetchManager = (managerId = null) => {
    const setManager = (manager) => {
      this.setState({ selectedManager: manager }, () => {
        this.handleFetchOutlet(manager);
        this.handleFetchTemplate(manager);
      });
    };

    const processManager = (result) => {
      if (managerId == null) {
        let managerItem = result.data[0];

        if (managerItem) setManager(managerItem.id);
      } else {
        setManager(managerId);
      }
    };

    fetchManagersApi()
      .then((response) => response)
      .then((result) => {
        this.setState({ managerItems: result.data }, processManager(result));
      });
  };

  handleBeforeManagerChange = async (e) => {
    let target = e.target;
    let value = target.value;

    return new Promise((resolve) => resolve())
      .then(() => this.handleManagerChange(value))
      .then(() => setTimeout(() => this.handleFetchTemplateData(), 500));
  };

  handleManagerChange = (managerId) => {
    new Promise((resolve) => resolve()).then(() => {
      this.setState({ selectedManager: managerId }, () => {
        this.handleFetchOutlet(managerId);
        this.handleFetchTemplate(managerId);
      });
    });
  };

  handleFetchTemplate = (managerId) => {
    fetchTemplatesByManagerApi(managerId)
      .then((response) => response)
      .then((result) => {
        if (!(result.data.length > 1)) {
          new Promise((resolve) => resolve())
            .then(() => this.props.resetTemplateViewData())
            .then(() => this.handleRemoveAllData());
        }

        this.setState({ templateItems: result.data }, () => {
          let templateItem = result.data[0];

          this.setState({
            selectedTemplate: templateItem ? templateItem.id : 0,
          });
        });
      });
  };

  handleFetchOutlet = (managerId) => {
    const setOutlet = (result) => {
      let outletItem = result.data[0];

      if (outletItem) {
        const { formSelected } = this.props;
        const { selectedOutlet } = formSelected;

        let outletId = selectedOutlet ?? outletItem.id;

        this.setState({ selectedOutlet: outletId }, () => {
          this.handleFetchSupervisor(managerId, outletId);
        });
      }
    };

    fetchOutletByManagerApi(managerId)
      .then((response) => response)
      .then((result) => {
        this.setState({ outletItems: result.data }, setOutlet(result));
      });
  };

  handleFetchSupervisor = (managerId, outletId) => {
    const setSupervisor = (result) => {
      if (result.data.supervisor) {
        let svItem = result.data.supervisor[0];

        if (svItem) {
          const { formSelected } = this.props;
          const { selectedSupervisor } = formSelected;

          let supervisorId = selectedSupervisor ?? svItem.id;

          this.setState({ selectedSupervisor: supervisorId }, () => {
            this.handleFetchStaff(supervisorId, managerId, outletId);
          });
        }
      }
    };

    fetchSupervisorByManagerApi(managerId, outletId)
      .then((response) => response)
      .then((result) => {
        this.setState(
          {
            supervisorItems: result.data.supervisor,
            selectedStaff: undefined,
            staffItems: [],
          },
          setSupervisor(result)
        );
      });
  };

  handleFetchStaff = (supervisorId, managerId, outletId) => {
    const setStaff = (result) => {
      if (result.data) {
        let staffItem = result.data[0];

        if (staffItem) {
          const { formSelected } = this.props;
          const { selectedStaff } = formSelected;

          let staffId = selectedStaff ?? staffItem.id;

          this.setState({ selectedStaff: staffId });
        }
      }
    };

    fetchStaffsBySupervisorApi(supervisorId, managerId, outletId)
      .then((response) => response)
      .then((result) => {
        this.setState({ staffItems: result.data }, setStaff(result));
      });
  };

  handleOutletChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve()).then(() => {
      this.setState({ selectedOutlet: value }, () => {
        let { selectedOutlet, selectedManager } = this.state;

        this.handleFetchSupervisor(selectedManager, selectedOutlet);
      });
    });
  };

  handleSupervisorChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve()).then(() => {
      this.setState({ selectedSupervisor: value }, () => {
        let { selectedSupervisor, selectedManager, selectedOutlet } =
          this.state;

        this.handleFetchStaff(
          selectedSupervisor,
          selectedManager,
          selectedOutlet
        );
      });
    });
  };

  handleStaffChange = (e) => {
    let target = e.target;
    let value = target.value;

    new Promise((resolve) => resolve()).then(() => {
      this.setState({ selectedStaff: value });
    });
  };

  handlePagination = (page = 1) => {
    const { detailFitered, pageSize } = this.state;

    let start = page > 0 ? (page - 1) * pageSize : 0;
    let end = start + pageSize;

    let currentItems = detailFitered.slice(start, end);

    // Check current page
    if (!currentItems.length > 0 && page > 1) {
      return this.handlePagination(page - 1);
    }

    this.setState({ detailArrs: currentItems, pageNumber: page });
  };

  handleClick = async (item, selectedUnit, selectedUnitDetail) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        let { detailItems, units } = this.state;
        let selected = item.units[selectedUnit];
        let unitArrs = {
          unit: selectedUnit,
          unit_value: selected.value,
          unit_sku: selected.sku,
        };

        let unitResult =
          typeof units[item.id] !== "undefined"
            ? [...units[item.id], unitArrs]
            : [unitArrs];

        let unitSet = {
          ...units,
          [`${item.id}`]: sortData(unitResult, "unit_value"),
        };

        let result = {
          ...detailItems,
          [item.id]: {
            order: order++,
            id: item.id,
            forms_id: 0,
            product_id: item.product_id,
            product_name: item.product_name,
            product_code: item.product_code,
            unit: selectedUnit,
            value: 0,
            units: unitResult,
          },
        };

        this.setState({ units: unitSet, detailItems: result });
      })
      .then(() => {
        let { detailItems } = this.state;
        let values = Object.values(detailItems);
        let sorted = sortData([...values], "order");

        this.setState({ detailFitered: sorted });
      })
      .then(() => this.handlePagination())
      .then(() => {
        let { selectedItems } = this.state;

        let newData = {
          product_id: item.product_id,
          product_name: item.product_name,
          product_code: item.product_code,
          unit: selectedUnit,
          unit_sku: selectedUnitDetail.sku,
          unit_value: selectedUnitDetail.value,
        };

        let newItems = [...[newData], ...selectedItems];

        this.setState({ selectedItems: newItems });
      });
  };

  handleRemoveAllData = async () => {
    return new Promise((resolve) => resolve()).then(() => {
      this.setState({
        detailArrs: [],
        detailItems: [],
        detailFitered: [],
        selectedItems: [],
        units: [],
        pageNumber: 1,
        pageSize: 15,
      });
    });
  };

  handleRemoveData = async (item, pageNumber) => {
    return new Promise((resolve) => resolve())
      .then(() => {
        const { detailItems } = this.state;

        let details = Object.values(detailItems).filter(
          (target) => target.product_id != item.product_id
        );

        let result = {};

        Object.values(details).map((item) => {
          result[item.id] = { ...item };
        });

        this.setState({ detailItems: result });
      })
      .then(() => {
        //  Remove Units from state
        const { units } = this.state;

        let filterUnit = Object.fromEntries(
          Object.entries(units).filter(([key]) => key != item.id)
        );

        this.setState({ units: filterUnit });
      })
      .then(() => {
        const { detailFitered } = this.state;

        let filteredItems = detailFitered.filter(
          (target) => target.product_id != item.product_id
        );

        this.setState({
          detailArrs: filteredItems,
          detailFitered: filteredItems,
        });
      })
      .then(() => this.handlePagination(pageNumber))
      .then(() => {
        const { selectedItems } = this.state;

        let filteredItems = selectedItems.filter(
          (target) => target.product_code != item.product_code
        );

        this.setState({ selectedItems: filteredItems });
      });
  };

  handleSaveBtn = (e) => {
    e.preventDefault();

    let {
      selectedTemplate,
      selectedSupervisor,
      selectedManager,
      selectedOutlet,
      selectedStaff,
      selectedItems,
    } = this.state;

    let { createNewFormDetails } = this.props;

    let params = {
      template: parseInt(selectedTemplate),
      supervisor: parseInt(selectedSupervisor),
      manager: parseInt(selectedManager),
      outlet: parseInt(selectedOutlet),
      staff: parseInt(selectedStaff),
      items: selectedItems,
    };

    createNewFormDetails(params)
      .then((response) => response)
      .then(() => {
        this.props.history.push("/forms");
      });
  };

  render() {
    const {
      detailFitered,
      detailArrs,
      selectedItems,
      pageNumber,
      pageSize,
      staffItems,
      outletItems,
      supervisorItems,
      managerItems,
      templateItems,
      selectedStaff,
      selectedOutlet,
      selectedSupervisor,
      selectedManager,
      selectedTemplate,
      items,
      orderList,
    } = this.state;

    let templateProps = {
      handleBeforeTemplateChange: this.handleBeforeTemplateChange,
      handleBeforeManagerChange: this.handleBeforeManagerChange,
      handleFetchTemplatedata: this.handleFetchTemplateData,
      handlePagination: this.handleTemplatePagination,
      handleManagerChange: this.handleManagerChange,
      handleClick: this.handleClick,
      managerItems,
      templateItems,
      selectedManager,
      selectedTemplate,
      selectedItems,
      detailFitered,
      pageNumber,
      items,
      orderList,
    };

    let detailProps = {
      handleBeforeManagerChange: this.handleBeforeManagerChange,
      handleSupervisorChange: this.handleSupervisorChange,
      handleRemoveAllData: this.handleRemoveAllData,
      handleManagerChange: this.handleManagerChange,
      handleStaffChange: this.handleStaffChange,
      handleOutletChange: this.handleOutletChange,
      handleRemoveData: this.handleRemoveData,
      handlePagination: this.handlePagination,
      handleSaveBtn: this.handleSaveBtn,
      managerItems,
      outletItems,
      staffItems,
      supervisorItems,
      selectedManager,
      selectedOutlet,
      selectedSupervisor,
      selectedStaff,
      detailFitered,
      detailArrs,
      pageNumber,
      pageSize,
    };

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Create Form</h4>
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
  auth: state.auth.data,
  formDetails: state.form.data,
  templatesDetails: state.template.data,
  selected: state.formDetailsSelected.data,
  formSelected: state.formSelected?.data,
});
const mapDispatchToProps = (dispatch) => ({
  fetchTemplateViewData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplateViewData(params)).then(() => resolve());
    });
  },
  fetchFormDetailsSelectedData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchFormDetailsSelectedData(params)).then(() => resolve());
    });
  },
  createFormDetails: (params) => {
    return new Promise((resolve) => {
      dispatch(createFormDetails(params)).then(() => resolve());
    });
  },
  createNewFormDetails: (params) => {
    return new Promise((resolve) => {
      dispatch(createNewFormDetails(params)).then(() => resolve());
    });
  },
  resetFormSelected: () => {
    dispatch(resetFormSelected());
  },
  resetTemplateViewData: () => {
    dispatch(resetTemplateViewData());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormCreate);
