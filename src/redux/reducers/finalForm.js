import {
  CREATE_FINAL_FORM_REQUEST,
  CREATE_FINAL_FORM_SUCCESS,
  CREATE_FINAL_FORM_FAILED,
  FETCH_FINAL_FORM_REQUEST,
  FETCH_FINAL_FORM_SUCCESS,
  FETCH_FINAL_FORM_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const finalForm = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FINAL_FORM_REQUEST:
    case FETCH_FINAL_FORM_REQUEST:
      return { ...state };

    case CREATE_FINAL_FORM_SUCCESS:
    case FETCH_FINAL_FORM_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case CREATE_FINAL_FORM_FAILED:
    case FETCH_FINAL_FORM_FAILED:
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

export default finalForm;
