import {
  FETCH_TEMPLATE_VIEW_REQUEST,
  FETCH_TEMPLATE_VIEW_SUCCESS,
  FETCH_TEMPLATE_VIEW_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const TemplateDetails = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMPLATE_VIEW_REQUEST:
      return { ...state };

    case FETCH_TEMPLATE_VIEW_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_TEMPLATE_VIEW_FAILED:
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

export default TemplateDetails;
