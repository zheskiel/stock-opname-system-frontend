import {
  FETCH_TESTING_STAFF_FORMS_REQUEST,
  FETCH_TESTING_STAFF_FORMS_SUCCESS,
  FETCH_TESTING_STAFF_FORMS_FAILED,
} from "./types";

import { fetchStaffFormsApi } from "../../apis/testing";

import errorHandler from "../../utils/errHandler";

export const fetchStaffFormData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchStaffFormDataRequest());

    return new Promise((resolve, reject) => {
      fetchStaffFormsApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchStaffFormDataSuccess(result));
          } else {
            dispatch(fetchStaffFormDataFailed(result));
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

const fetchStaffFormDataRequest = () => {
  return {
    type: FETCH_TESTING_STAFF_FORMS_REQUEST,
  };
};

const fetchStaffFormDataSuccess = (result) => {
  return {
    type: FETCH_TESTING_STAFF_FORMS_SUCCESS,
    payload: result,
  };
};

const fetchStaffFormDataFailed = (result) => {
  return {
    type: FETCH_TESTING_STAFF_FORMS_FAILED,
    payload: result,
  };
};
