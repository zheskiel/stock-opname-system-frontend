import {
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCEESS,
  FETCH_REPORTS_FAILED,
} from "./types";

import { fetchReportsApi } from "../../apis";
import errorHandler from "../../utils/errHandler";

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

export const fetchReportsDataRequest = () => {
  return {
    type: FETCH_REPORTS_REQUEST,
  };
};

export const fetchReportsDataSuccess = (result) => {
  return {
    type: FETCH_REPORTS_SUCEESS,
    payload: result,
  };
};

export const fetchReportsDataFailed = (result) => {
  return {
    type: FETCH_REPORTS_FAILED,
    payload: result,
  };
};
