import {
  CREATE_FINAL_FORM_REQUEST,
  CREATE_FINAL_FORM_SUCCESS,
  CREATE_FINAL_FORM_FAILED,
  FETCH_FINAL_FORM_REQUEST,
  FETCH_FINAL_FORM_SUCCESS,
  FETCH_FINAL_FORM_FAILED,
} from "./types";

import { createFinalFormReportApi, fetchFinalFormReportApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const CreateFinalFormsData = () => (dispatch) => {
  dispatch(CreateFinalFormsDataRequest());

  return new Promise((resolve, reject) => {
    createFinalFormReportApi()
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(CreateFinalFormsDataSuccess(result));
        } else {
          dispatch(CreateFinalFormsDataFailed(result));
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

export const CreateFinalFormsDataRequest = () => {
  return {
    type: CREATE_FINAL_FORM_REQUEST,
  };
};

export const CreateFinalFormsDataSuccess = (result) => {
  return {
    type: CREATE_FINAL_FORM_SUCCESS,
    payload: result,
  };
};

export const CreateFinalFormsDataFailed = (result) => {
  return {
    type: CREATE_FINAL_FORM_FAILED,
    payload: result,
  };
};

export const fetchFinalFormsData = (params) => (dispatch) => {
  dispatch(fetchFinalFormsDataRequest());

  return new Promise((resolve, reject) => {
    fetchFinalFormReportApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchFinalFormsDataSuccess(result));
        } else {
          dispatch(fetchFinalFormsDataFailed(result));
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

export const fetchFinalFormsDataRequest = () => {
  return {
    type: FETCH_FINAL_FORM_REQUEST,
  };
};

export const fetchFinalFormsDataSuccess = (result) => {
  return {
    type: FETCH_FINAL_FORM_SUCCESS,
    payload: result,
  };
};

export const fetchFinalFormsDataFailed = (result) => {
  return {
    type: FETCH_FINAL_FORM_FAILED,
    payload: result,
  };
};
