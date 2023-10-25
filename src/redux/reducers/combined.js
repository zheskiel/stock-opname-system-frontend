import {
  FETCH_COMBINED_REQUEST,
  FETCH_COMBINED_SUCCESS,
  FETCH_COMBINED_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const combinedForms = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMBINED_REQUEST:
      return { ...state };

    case FETCH_COMBINED_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_COMBINED_FAILED:
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

export default combinedForms;
