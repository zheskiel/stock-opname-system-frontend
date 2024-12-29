import {
  CREATE_FORM_DETAIL_REQUEST,
  CREATE_FORM_DETAIL_SUCCESS,
  CREATE_FORM_DETAIL_FAILED,
  UPDATE_FORM_DETAILS_REQUEST,
  UPDATE_FORM_DETAILS_SUCCESS,
  UPDATE_FORM_DETAILS_FAILED,
  REMOVE_FORM_DETAIL_REQUEST,
  REMOVE_FORM_DETAIL_SUCCESS,
  REMOVE_FORM_DETAIL_FAILED,
  REMOVE_ALL_FORM_DETAIL,
  FETCH_FORM_DETAILS_REQUEST,
  FETCH_FORM_DETAILS_SUCCESS,
  FETCH_FORM_DETAILS_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const FormDetails = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FORM_DETAIL_SUCCESS:
    case REMOVE_FORM_DETAIL_SUCCESS:
      var { success, message, data } = action.payload;

      var newData = Object.assign({}, data.data);
      let newDetails = Object.assign({}, data.data.items);
      let newStaff = Object.assign({}, data.data.staff);

      let staffData = {
        ...state.data.staff,
        ...newStaff,
      };

      let itemData = {
        ...state.data.items,
        ...newDetails,
      };

      var dataParams = {
        ...state.data,
        ...data,
        data: {
          ...state.data.data,
          ...newData,
          staff: staffData,
          items: itemData,
        },
      };

      var newState = {
        success,
        message,
        data: dataParams,
      };

      return { ...state, ...newState };

    case UPDATE_FORM_DETAILS_SUCCESS:
      var { success, data } = action.payload;

      var newData = Object.assign([], data);

      var dataParams = {
        ...state.data,
        data: {
          ...state.data.data,
          items: transformData(newData),
        },
      };

      var newState = {
        success,
        message: "Updated",
        data: dataParams,
      };

      return { ...state, ...newState };

    case REMOVE_ALL_FORM_DETAIL:
      var dataParams = {
        ...state.data,
        data: {
          ...state.data.data,
          items: [],
        },
      };

      var newState = {
        ...state,
        data: dataParams,
      };

      return { ...state, ...newState };

    case FETCH_FORM_DETAILS_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case CREATE_FORM_DETAIL_REQUEST:
    case UPDATE_FORM_DETAILS_REQUEST:
    case REMOVE_FORM_DETAIL_REQUEST:
    case FETCH_FORM_DETAILS_REQUEST:
      return { ...state };

    case CREATE_FORM_DETAIL_FAILED:
    case UPDATE_FORM_DETAILS_FAILED:
    case REMOVE_FORM_DETAIL_FAILED:
    case FETCH_FORM_DETAILS_FAILED:
      var { success, message } = action.payload;

      var newState = {
        success,
        message,
      };

      return { ...state, ...newState };

    default:
      return state;
  }
};

const transformData = (data) => {
  const map = new Map();

  data.forEach((item) => {
    const key = `${item.product_id}_${item.product_code}`;

    const unitData = {
      unit: item.unit,
      unit_sku: item.unit_sku,
      unit_value: item.unit_value,
    };

    if (!map.has(key)) {
      map.set(key, {
        product_code: item.product_code,
        product_id: item.product_id,
        product_name: item.product_name,
        unit: item.unit,
        units: [unitData],
      });
    } else {
      map.get(key).units.push(unitData);
    }
  });

  return Array.from(map.values());
};

export default FormDetails;
