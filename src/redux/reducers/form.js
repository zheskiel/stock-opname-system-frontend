import {
  CREATE_FORM_DETAIL_REQUEST,
  CREATE_FORM_DETAIL_SUCCESS,
  CREATE_FORM_DETAIL_FAILED,
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

      let newData = Object.assign({}, data.data);
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
    case REMOVE_FORM_DETAIL_REQUEST:
    case FETCH_FORM_DETAILS_REQUEST:
      return { ...state };

    case CREATE_FORM_DETAIL_FAILED:
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

export default FormDetails;
