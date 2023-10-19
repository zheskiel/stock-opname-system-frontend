import {
  FETCH_MASTER_REQUEST,
  FETCH_MASTER_SUCCESS,
  FETCH_MASTER_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  status: "",
  message: "",
  data: [],
};

const Master = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_REQUEST:
      return { ...state };

    case FETCH_MASTER_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_MASTER_FAILED:
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
