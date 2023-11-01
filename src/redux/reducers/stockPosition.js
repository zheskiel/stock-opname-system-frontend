import {
  FETCH_STOCK_POSITION_REQUEST,
  FETCH_STOCK_POSITION_SUCCESS,
  FETCH_STOCK_POSITION_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const stockPosition = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCK_POSITION_REQUEST:
      return { ...state };

    case FETCH_STOCK_POSITION_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_STOCK_POSITION_FAILED:
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

export default stockPosition;
