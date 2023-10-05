import {
  FETCH_TEMPLATES_REQUEST,
  FETCH_TEMPLATES_SUCCESS,
  FETCH_TEMPLATES_FAILED,
} from "./types";

import { fetchTemplatesApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const fetchTemplatesData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchTemplatesDataRequest());

    return new Promise((resolve, reject) => {
      fetchTemplatesApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchTemplatesDataSuccess(result));
          } else {
            dispatch(fetchTemplatesDataFailed(result));
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

export const fetchTemplatesDataRequest = () => {
  return {
    type: FETCH_TEMPLATES_REQUEST,
  };
};

export const fetchTemplatesDataSuccess = (result) => {
  return {
    type: FETCH_TEMPLATES_SUCCESS,
    payload: result,
  };
};

export const fetchTemplatesDataFailed = (result) => {
  return {
    type: FETCH_TEMPLATES_FAILED,
    payload: result,
  };
};
