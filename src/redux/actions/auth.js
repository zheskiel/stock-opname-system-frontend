import {
  CLEAR_LOADING_STATE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_RESET_MESSAGE,
  LOGOUT,
} from "./types";

import { loginApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const AuthLogin = (email, password, type) => async (dispatch) => {
  dispatch(AuthLoginRequest());

  await loginApi(email, password, type)
    .then((response) => {
      if (response.success === true) {
        dispatch(AuthLoginSuccess(response));
      } else {
        dispatch(AuthLoginFailed(response));
      }
    })
    .catch((error) => {
      console.log("error : ", error);

      errorHandler(error);
    });
};

const AuthLoginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const AuthLoginSuccess = (result) => {
  return {
    type: LOGIN_SUCCESS,
    payload: result,
  };
};

const AuthLoginFailed = (result) => {
  return {
    type: LOGIN_FAILED,
    payload: result,
  };
};

export const AuthResetMessage = () => {
  return {
    type: LOGIN_RESET_MESSAGE,
  };
};

export const AuthLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const ClearLoadingStates = () => {
  return {
    type: CLEAR_LOADING_STATE,
  };
};
