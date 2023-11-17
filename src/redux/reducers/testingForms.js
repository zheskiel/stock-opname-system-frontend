import {
  FETCH_TESTING_FORM_BY_STAFF_REQUEST,
  FETCH_TESTING_FORM_BY_STAFF_SUCCESS,
  FETCH_TESTING_FORM_BY_STAFF_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const testingForms = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TESTING_FORM_BY_STAFF_REQUEST:
      return { ...state };

    case FETCH_TESTING_FORM_BY_STAFF_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_TESTING_FORM_BY_STAFF_FAILED:
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

export default testingForms;
