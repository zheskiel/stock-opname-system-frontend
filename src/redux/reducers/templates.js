import {
  FETCH_TEMPLATES_REQUEST,
  FETCH_TEMPLATES_SUCCESS,
  FETCH_TEMPLATES_FAILED,
} from "../actions/types";

const initialState = {
  success: false,
  message: "",
  data: [],
};

const Templates = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMPLATES_REQUEST:
      return { ...state };

    case FETCH_TEMPLATES_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        success,
        message,
        data,
      };

      return { ...state, ...newState };

    case FETCH_TEMPLATES_FAILED:
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

export default Templates;
