import {
  FETCH_TEMPLATE_VIEW_REQUEST,
  FETCH_TEMPLATE_VIEW_SUCCESS,
  FETCH_TEMPLATE_VIEW_FAILED,
} from "./types";

import { fetchTemplateViewApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const fetchTemplateViewData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchTemplateViewDataRequest());

    return new Promise((resolve, reject) => {
      fetchTemplateViewApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchTemplateViewDataSuccess(result));
          } else {
            dispatch(fetchTemplateViewDataFailed(result));
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

export const fetchTemplateViewDataRequest = () => {
  return {
    type: FETCH_TEMPLATE_VIEW_REQUEST,
  };
};

export const fetchTemplateViewDataSuccess = (result) => {
  return {
    type: FETCH_TEMPLATE_VIEW_SUCCESS,
    payload: result,
  };
};

export const fetchTemplateViewDataFailed = (result) => {
  return {
    type: FETCH_TEMPLATE_VIEW_FAILED,
    payload: result,
  };
};
