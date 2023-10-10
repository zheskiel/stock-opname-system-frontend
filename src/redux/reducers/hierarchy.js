import {
  FETCH_HIERARCHY_REQUEST,
  FETCH_HIERARCHY_SUCCESS,
  FETCH_HIERARCHY_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const Master = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HIERARCHY_REQUEST:
      return { ...state };

    case FETCH_HIERARCHY_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_HIERARCHY_FAILED:
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

export default Master;
