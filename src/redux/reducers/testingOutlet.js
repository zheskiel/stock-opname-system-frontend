import {
  FETCH_TESTING_OUTLET_REQUEST,
  FETCH_TESTING_OUTLET_SUCCESS,
  FETCH_TESTING_OUTLET_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const testingOutlet = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TESTING_OUTLET_REQUEST:
      return { ...state };

    case FETCH_TESTING_OUTLET_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_TESTING_OUTLET_FAILED:
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

export default testingOutlet;
