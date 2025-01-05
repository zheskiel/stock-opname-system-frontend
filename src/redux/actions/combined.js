import {
  FETCH_COMBINED_REQUEST,
  FETCH_COMBINED_SUCCESS,
  FETCH_COMBINED_FAILED,
} from "./types";

import { fetchCombinedFormsApi } from "../../apis";
import errorHandler from "../../utils/errHandler";

export const fetchCombinedFormsData = (params) => (dispatch) => {
  dispatch(fetchCombinedFormsRequest());

  return new Promise((resolve, reject) => {
    fetchCombinedFormsApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success == true) {
          dispatch(fetchCombinedFormsSuccess(result));
        } else {
          dispatch(fetchCombinedFormsFailed(result));
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

const fetchCombinedFormsRequest = () => {
  return {
    type: FETCH_COMBINED_REQUEST,
  };
};

const fetchCombinedFormsSuccess = (result) => {
  return {
    type: FETCH_COMBINED_SUCCESS,
    payload: result,
  };
};

const fetchCombinedFormsFailed = (result) => {
  return {
    type: FETCH_COMBINED_FAILED,
    payload: result,
  };
};
