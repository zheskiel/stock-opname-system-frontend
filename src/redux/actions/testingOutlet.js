import {
  FETCH_TESTING_OUTLET_REQUEST,
  FETCH_TESTING_OUTLET_SUCCESS,
  FETCH_TESTING_OUTLET_FAILED,
} from "./types";

import { fetchOutletsApi } from "../../apis/testing";

import errorHandler from "../../utils/errHandler";

export const fetchOutletData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchOutletDataRequest());

    return new Promise((resolve, reject) => {
      fetchOutletsApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchOutletDataSuccess(result));
          } else {
            dispatch(fetchOutletDataFailed(result));
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

const fetchOutletDataRequest = () => {
  return {
    type: FETCH_TESTING_OUTLET_REQUEST,
  };
};

const fetchOutletDataSuccess = (result) => {
  return {
    type: FETCH_TESTING_OUTLET_SUCCESS,
    payload: result,
  };
};

const fetchOutletDataFailed = (result) => {
  return {
    type: FETCH_TESTING_OUTLET_FAILED,
    payload: result,
  };
};
