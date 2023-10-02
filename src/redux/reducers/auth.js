import {
  CLEAR_LOADING_STATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_RESET_MESSAGE,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuth: false,
  success: false,
  message: "",
  data: [],
  loading: false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_LOADING_STATE:
      return { ...state, loading: false };

    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      var { success, message, data } = action.payload;

      var newState = {
        isAuth: success,
        loading: false,
        success,
        message,
        data,
      };

      localStorage.setItem("token", data.token);

      return { ...state, ...newState };

    case LOGIN_FAILED:
      var { success, message } = action.payload;

      var newState = {
        loading: false,
        success,
        message,
      };

      return { ...state, ...newState };

    case LOGIN_RESET_MESSAGE:
      return { ...state, message: "" };

    case LOGOUT:
      localStorage.removeItem("token");

      return { ...state, isAuth: false, data: [] };

    default:
      return state;
  }
};

export default Auth;
