import {
  FETCH_COMPARE_WASTE_REQUEST,
  FETCH_COMPARE_WASTE_SUCCESS,
  FETCH_COMPARE_WASTE_FAILED,
} from "./types";

import { fetchCompareWasteApi } from "../../apis";
import errorHandler from "../../utils/errHandler";

export const fetchCompareWaste = (param) => (dispatch) => {
  dispatch(fetchCompareWasteRequest);

  return new Promise((resolve, reject) => {
    fetchCompareWasteApi(param)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchCompareWasteSuccess(result));
        } else {
          dispatch(fetchCompareWasteFailed(result));
        }

        return resolve(result);
      })
      .catch((error) => {
        console.log("error : ", error);

        errorHandler(error);

        reject(error);
      });
  });
};

export const fetchCompareWasteRequest = () => {
  return {
    type: FETCH_COMPARE_WASTE_REQUEST,
  };
};

export const fetchCompareWasteSuccess = (result) => {
  return {
    type: FETCH_COMPARE_WASTE_SUCCESS,
    payload: result,
  };
};

export const fetchCompareWasteFailed = (result) => {
  return {
    type: FETCH_COMPARE_WASTE_FAILED,
    payload: result,
  };
};
