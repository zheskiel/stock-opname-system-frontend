import {
  CREATE_STOCK_POSITION_REQUEST,
  CREATE_STOCK_POSITION_SUCCESS,
  CREATE_STOCK_POSITION_FAILED,
  FETCH_STOCK_POSITION_REQUEST,
  FETCH_STOCK_POSITION_SUCCESS,
  FETCH_STOCK_POSITION_FAILED,
} from "./types";

import {
  createStockPositionReportApi,
  fetchStockPositionReportApi,
} from "../../apis";
import errorHandler from "../../utils/errHandler";

export const createStockPosition = (param) => (dispatch) => {
  dispatch(createStockPositionRequest);

  return new Promise((resolve, reject) => {
    createStockPositionReportApi(param)
      .then((response) => response.data)
      .then((result) => {
        if (result.success === true) {
          dispatch(createStockPositionSuccess(result));
        } else {
          dispatch(createStockPositionFailed(result));
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

export const createStockPositionRequest = () => {
  return {
    type: CREATE_STOCK_POSITION_REQUEST,
  };
};

export const createStockPositionSuccess = (result) => {
  return {
    type: CREATE_STOCK_POSITION_SUCCESS,
    payload: result,
  };
};

export const createStockPositionFailed = (result) => {
  return {
    type: CREATE_STOCK_POSITION_FAILED,
    payload: result,
  };
};

export const fetchStockPosition = (param) => (dispatch) => {
  dispatch(fetchStockPositionRequest);

  return new Promise((resolve, reject) => {
    fetchStockPositionReportApi(param)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchStockPositionSuccess(result));
        } else {
          dispatch(fetchStockPositionFailed(result));
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

export const fetchStockPositionRequest = () => {
  return {
    type: FETCH_STOCK_POSITION_REQUEST,
  };
};

export const fetchStockPositionSuccess = (result) => {
  return {
    type: FETCH_STOCK_POSITION_SUCCESS,
    payload: result,
  };
};

export const fetchStockPositionFailed = (result) => {
  return {
    type: FETCH_STOCK_POSITION_FAILED,
    payload: result,
  };
};
