import {
  CREATE_REPORTS_REQUEST,
  CREATE_REPORTS_SUCCESS,
  CREATE_REPORTS_FAILED,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILED,
} from "./types";

import { createReportsApi, fetchReportsApi } from "../../apis";
import errorHandler from "../../utils/errHandler";

export const createReportsData = (params) => (dispatch) => {
  dispatch(createReportsDataRequest());

  return new Promise((resolve, reject) => {
    createReportsApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(createReportsDataSuccess(result));
        } else {
          dispatch(createReportsDataFailed(result));
        }

        resolve(result);
      })
      .catch((error) => {
        console.log("error : ", error);

        errorHandler(error);
        reject(error);
      });
  });
};
export const createReportsDataRequest = () => {
  return {
    type: CREATE_REPORTS_REQUEST,
  };
};

export const createReportsDataSuccess = (result) => {
  return {
    type: CREATE_REPORTS_SUCCESS,
    payload: result,
  };
};

export const createReportsDataFailed = (result) => {
  return {
    type: CREATE_REPORTS_FAILED,
    payload: result,
  };
};

export const fetchReportsData = () => (dispatch) => {
  dispatch(fetchReportsDataRequest());

  return new Promise((resolve, reject) => {
    fetchReportsApi()
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchReportsDataSuccess(result));
        } else {
          dispatch(fetchReportsDataFailed(result));
        }

        resolve(result);
      })
      .catch((error) => {
        console.log("error : ", error);

        errorHandler(error);
        reject(error);
      });
  });
};

const fetchReportsDataRequest = () => {
  return {
    type: FETCH_REPORTS_REQUEST,
  };
};

const fetchReportsDataSuccess = (result) => {
  return {
    type: FETCH_REPORTS_SUCCESS,
    payload: result,
  };
};

const fetchReportsDataFailed = (result) => {
  return {
    type: FETCH_REPORTS_FAILED,
    payload: result,
  };
};
