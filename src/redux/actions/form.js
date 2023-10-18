import {
  CREATE_FORM_DETAIL_REQUEST,
  CREATE_FORM_DETAIL_SUCCESS,
  CREATE_FORM_DETAIL_FAILED,
  REMOVE_FORM_DETAIL_REQUEST,
  REMOVE_FORM_DETAIL_SUCCESS,
  REMOVE_FORM_DETAIL_FAILED,
  REMOVE_ALL_FORM_DETAIL,
  FETCH_FORM_DETAILS_REQUEST,
  FETCH_FORM_DETAILS_SUCCESS,
  FETCH_FORM_DETAILS_FAILED,
  FETCH_FORM_DETAILS_SELECTED_REQUEST,
  FETCH_FORM_DETAILS_SELECTED_SUCCESS,
  FETCH_FORM_DETAILS_SELECTED_FAILED,
} from "./types";

import {
  createFormDetailApi,
  fetchFormDetailsApi,
  fetchFormDetailsAllSelectedApi,
  removeFormDetailApi,
  removeAllFormDetailApi,
} from "../../apis";

import errorHandler from "../../utils/errHandler";

// Create Form Detail
export const createFormDetail =
  (params = {}) =>
  (dispatch) => {
    dispatch(createFormDetailRequest());

    return new Promise((resolve, reject) => {
      createFormDetailApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(createFormDetailSuccess(result));
          } else {
            dispatch(createFormDetailFailed(result));
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

export const createFormDetailRequest = () => {
  return {
    type: CREATE_FORM_DETAIL_REQUEST,
  };
};

export const createFormDetailSuccess = (result) => {
  return {
    type: CREATE_FORM_DETAIL_SUCCESS,
    payload: result,
  };
};

export const createFormDetailFailed = (result) => {
  return {
    type: CREATE_FORM_DETAIL_FAILED,
    payload: result,
  };
};

export const removeAllFormDetail = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    removeAllFormDetailApi(params)
      .then((response) => response)
      .then((result) => {
        dispatch(removeAllFormDetailSuccess());
        resolve(result);
      })
      .catch((error) => {
        console.log("error : ", error);

        errorHandler(error);
        reject(error);
      });
  });
};

export const removeAllFormDetailSuccess = () => {
  return {
    type: REMOVE_ALL_FORM_DETAIL,
  };
};

// Remove Form Detail
export const removeFormDetail =
  (params = {}) =>
  (dispatch) => {
    dispatch(removeFormDetailRequest());

    return new Promise((resolve, reject) => {
      removeFormDetailApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(removeFormDetailSuccess(result));
          } else {
            dispatch(removeFormDetailFailed(result));
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

export const removeFormDetailRequest = () => {
  return {
    type: REMOVE_FORM_DETAIL_REQUEST,
  };
};

export const removeFormDetailSuccess = (result) => {
  return {
    type: REMOVE_FORM_DETAIL_SUCCESS,
    payload: result,
  };
};

export const removeFormDetailFailed = (result) => {
  return {
    type: REMOVE_FORM_DETAIL_FAILED,
    payload: result,
  };
};

export const fetchFormDetailsData = (params) => (dispatch) => {
  dispatch(fetchFormDetailsDataRequest());

  return new Promise((resolve, reject) => {
    fetchFormDetailsApi(params)
      .then((response) => response)
      .then((result) => {
        if (result.success === true) {
          dispatch(fetchFormDetailsDataSucess(result));
        } else {
          dispatch(fetchFormDetailsDataFailed(result));
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

export const fetchFormDetailsDataRequest = () => {
  return {
    type: FETCH_FORM_DETAILS_REQUEST,
  };
};

export const fetchFormDetailsDataSucess = (result) => {
  return {
    type: FETCH_FORM_DETAILS_SUCCESS,
    payload: result,
  };
};

export const fetchFormDetailsDataFailed = (result) => {
  return {
    type: FETCH_FORM_DETAILS_FAILED,
    payload: result,
  };
};

// Fetch Form Details Selected Data
export const fetchFormDetailsSelectedData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchFormDetailsSelectedDataRequest());

    return new Promise((resolve, reject) => {
      fetchFormDetailsAllSelectedApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchFormDetailsSelectedDataSuccess(result));
          } else {
            dispatch(fetchFormDetailsSelectedDataFailed(result));
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

export const fetchFormDetailsSelectedDataRequest = () => {
  return {
    type: FETCH_FORM_DETAILS_SELECTED_REQUEST,
  };
};

export const fetchFormDetailsSelectedDataSuccess = (result) => {
  return {
    type: FETCH_FORM_DETAILS_SELECTED_SUCCESS,
    payload: result,
  };
};

export const fetchFormDetailsSelectedDataFailed = (result) => {
  return {
    type: FETCH_FORM_DETAILS_SELECTED_FAILED,
    payload: result,
  };
};
