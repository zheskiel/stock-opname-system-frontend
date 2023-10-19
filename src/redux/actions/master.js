import {
  FETCH_MASTER_REQUEST,
  FETCH_MASTER_SUCCESS,
  FETCH_MASTER_FAILED,
} from "./types";

import { fetchMasterApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const fetchMasterData = (params) => (dispatch) => {
  dispatch(fetchMasterDataRequest());

  return new Promise((resolve, reject) => {
    fetchMasterApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchMasterDataSuccess(result));
        } else {
          dispatch(fetchMasterDataFailed(result));
          errorHandler(result);
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

export const fetchMasterDataRequest = () => {
  return {
    type: FETCH_MASTER_REQUEST,
  };
};

export const fetchMasterDataSuccess = (result) => {
  return {
    type: FETCH_MASTER_SUCCESS,
    payload: result,
  };
};

export const fetchMasterDataFailed = (result) => {
  return {
    type: FETCH_MASTER_FAILED,
    payload: result,
  };
};
