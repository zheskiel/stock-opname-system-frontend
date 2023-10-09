import {
  FETCH_FORMS_REQUEST,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILED,
} from "./types";

import { fetchFormsApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const fetchFormsData = (params) => (dispatch) => {
  dispatch(fetchFormsDataRequest());

  return new Promise((resolve, reject) => {
    fetchFormsApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchFormsDataSuccess(result));
        } else {
          dispatch(fetchFormsDataFailed(result));
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

export const fetchFormsDataRequest = () => {
  return {
    type: FETCH_FORMS_REQUEST,
  };
};

export const fetchFormsDataSuccess = (result) => {
  return {
    type: FETCH_FORMS_SUCCESS,
    payload: result,
  };
};

export const fetchFormsDataFailed = (result) => {
  return {
    type: FETCH_FORMS_FAILED,
    payload: result,
  };
};
