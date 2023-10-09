import {
  FETCH_FORM_DETAILS_SELECTED_REQUEST,
  FETCH_FORM_DETAILS_SELECTED_SUCCESS,
  FETCH_FORM_DETAILS_SELECTED_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const FormDetailsSelected = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORM_DETAILS_SELECTED_REQUEST:
      return { ...state };

    case FETCH_FORM_DETAILS_SELECTED_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_FORM_DETAILS_SELECTED_FAILED:
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

export default FormDetailsSelected;
