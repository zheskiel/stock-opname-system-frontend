import {
  CREATE_TEMPLATE_DETAIL_REQUEST,
  CREATE_TEMPLATE_DETAIL_SUCCESS,
  CREATE_TEMPLATE_DETAIL_FAILED,
  REMOVE_TEMPLATE_DETAIL_REQUEST,
  REMOVE_TEMPLATE_DETAIL_SUCCESS,
  REMOVE_TEMPLATE_DETAIL_FAILED,
  REMOVE_ALL_TEMPLATE_DETAIL,
  FETCH_TEMPLATE_VIEW_REQUEST,
  FETCH_TEMPLATE_VIEW_SUCCESS,
  FETCH_TEMPLATE_VIEW_FAILED,
  RESET_TEMPLATE_SELECTED,
  RESET_TEMPLATE_VIEW,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const TemplateDetails = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEMPLATE_DETAIL_SUCCESS:
    case REMOVE_TEMPLATE_DETAIL_SUCCESS:
      var { success, message, data } = action.payload;

      let newData = Object.assign({}, data.data);
      let newDetails = Object.assign({}, data.data.details);

      var dataParams = {
        ...state.data,
        ...data,
        data: {
          ...state.data.data,
          ...newData,
          details: {
            ...state.data.details,
            ...newDetails,
          },
        },
      };

      var newState = {
        success,
        message,
        data: dataParams,
      };

      return { ...state, ...newState };

    case REMOVE_ALL_TEMPLATE_DETAIL:
      var dataParams = {
        ...state.data,
        data: {
          ...state.data.data,
          details: [],
        },
      };

      var newState = {
        ...state,
        data: dataParams,
      };

      return { ...state, ...newState };

    case FETCH_TEMPLATE_VIEW_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case CREATE_TEMPLATE_DETAIL_REQUEST:
    case REMOVE_TEMPLATE_DETAIL_REQUEST:
    case FETCH_TEMPLATE_VIEW_REQUEST:
      return { ...state };

    case CREATE_TEMPLATE_DETAIL_FAILED:
    case REMOVE_TEMPLATE_DETAIL_FAILED:
    case FETCH_TEMPLATE_VIEW_FAILED:
      var { success, message } = action.payload;

      var newState = {
        success,
        message,
      };

      return { ...state, ...newState };

    case RESET_TEMPLATE_SELECTED:
    case RESET_TEMPLATE_VIEW:
      return initialState;

    default:
      return state;
  }
};

export default TemplateDetails;
