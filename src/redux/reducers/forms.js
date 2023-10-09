import {
  FETCH_FORMS_REQUEST,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const Forms = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORMS_REQUEST:
      return { ...state };

    case FETCH_FORMS_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_FORMS_FAILED:
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

export default Forms;
