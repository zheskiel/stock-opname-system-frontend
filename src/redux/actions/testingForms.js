import {
  FETCH_TESTING_FORM_BY_STAFF_REQUEST,
  FETCH_TESTING_FORM_BY_STAFF_SUCCESS,
  FETCH_TESTING_FORM_BY_STAFF_FAILED,
  CREATE_DAILY_FORM_REPORT,
} from "./types";

import {
  fetchFormByStaffApi,
  createDailyFormReportApi,
} from "../../apis/testing";

import errorHandler from "../../utils/errHandler";

export const createDailyFormReport = (params) => (dispatch) => {
  dispatch(createDailyFormReportRequest());

  return new Promise((resolve, reject) => {
    createDailyFormReportApi(params)
      .then((response) => response)
      .then((result) => {
        console.log("result : ", result);

        resolve(result);
      })
      .catch((error) => {
        console.log("error : ", error);

        // errorHandler(error);
        // reject(error);
      });
  });
};

export const createDailyFormReportRequest = () => {
  return {
    type: CREATE_DAILY_FORM_REPORT,
  };
};

export const fetchFormByStaffData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchFormByStaffDataRequest());

    return new Promise((resolve, reject) => {
      fetchFormByStaffApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchFormByStaffDataSuccess(result));
          } else {
            dispatch(fetchFormByStaffDataFailed(result));
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

export const fetchFormByStaffDataRequest = () => {
  return {
    type: FETCH_TESTING_FORM_BY_STAFF_REQUEST,
  };
};

export const fetchFormByStaffDataSuccess = (result) => {
  return {
    type: FETCH_TESTING_FORM_BY_STAFF_SUCCESS,
    payload: result,
  };
};

export const fetchFormByStaffDataFailed = (result) => {
  return {
    type: FETCH_TESTING_FORM_BY_STAFF_FAILED,
    payload: result,
  };
};
