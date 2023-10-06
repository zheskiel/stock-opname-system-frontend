import {
  FETCH_TEMPLATE_SELECTED_REQUEST,
  FETCH_TEMPLATE_SELECTED_SUCCESS,
  FETCH_TEMPLATE_SELECTED_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const TemplateSelected = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMPLATE_SELECTED_REQUEST:
      return { ...state };

    case FETCH_TEMPLATE_SELECTED_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_TEMPLATE_SELECTED_FAILED:
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

export default TemplateSelected;
