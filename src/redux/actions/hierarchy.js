import {
  FETCH_HIERARCHY_REQUEST,
  FETCH_HIERARCHY_SUCCESS,
  FETCH_HIERARCHY_FAILED,
} from "./types";

import { fetchHierarchyDataApi } from "../../apis";

import errorHandler from "../../utils/errHandler";

export const fetchHierarchyData = (params) => (dispatch) => {
  dispatch(fetchHierarchyDataRequest());

  return new Promise((resolve, reject) => {
    fetchHierarchyDataApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchHierarchyDataSuccess(result));
        } else {
          dispatch(fetchHierarchyDataFailed(result));
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

export const fetchHierarchyDataRequest = () => {
  return {
    type: FETCH_HIERARCHY_REQUEST,
  };
};

export const fetchHierarchyDataSuccess = (result) => {
  return {
    type: FETCH_HIERARCHY_SUCCESS,
    payload: result,
  };
};

export const fetchHierarchyDataFailed = (result) => {
  return {
    type: FETCH_HIERARCHY_FAILED,
    payload: result,
  };
};
