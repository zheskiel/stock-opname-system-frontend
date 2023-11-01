import {
  FETCH_COMPARE_WASTE_REQUEST,
  FETCH_COMPARE_WASTE_SUCCESS,
  FETCH_COMPARE_WASTE_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const compareWaste = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPARE_WASTE_REQUEST:
      return { ...state };

    case FETCH_COMPARE_WASTE_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_COMPARE_WASTE_FAILED:
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

export default compareWaste;
