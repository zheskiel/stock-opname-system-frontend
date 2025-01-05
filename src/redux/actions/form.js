import {
  CREATE_FORM_DETAIL_REQUEST,
  CREATE_FORM_DETAIL_SUCCESS,
  CREATE_FORM_DETAIL_FAILED,
  FETCH_FORM_DETAILS_REQUEST,
  FETCH_FORM_DETAILS_SUCCESS,
  FETCH_FORM_DETAILS_FAILED,
  FETCH_FORM_DETAILS_SELECTED_REQUEST,
  FETCH_FORM_DETAILS_SELECTED_SUCCESS,
  FETCH_FORM_DETAILS_SELECTED_FAILED,
  CREATE_NEW_FORM_DETAILS_REQUEST,
  CREATE_NEW_FORM_DETAILS_SUCCESS,
  CREATE_NEW_FORM_DETAILS_FAILED,
  UPDATE_FORM_DETAILS_REQUEST,
  UPDATE_FORM_DETAILS_SUCCESS,
  UPDATE_FORM_DETAILS_FAILED,
} from "./types";

import {
  createNewFormDetailsApi,
  updateFormDetailsApi,
  fetchFormDetailsApi,
  fetchFormDetailsAllSelectedApi,
} from "../../apis";

import errorHandler from "../../utils/errHandler";

// Create New Form Detail
export const createNewFormDetails =
  (params = {}) =>
  (dispatch) => {
    dispatch(createNewFormDetailsRequest());

    return new Promise((resolve, reject) => {
      createNewFormDetailsApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(createNewFormDetailsSuccess(result));
          } else {
            dispatch(createNewFormDetailsFailed(result));
          }

          resolve();
        })
        .catch((error) => {
          console.log("error : ", error);

          errorHandler(error);
          reject(error);
        });
    });
  };

const createNewFormDetailsRequest = () => {
  return {
    type: CREATE_NEW_FORM_DETAILS_REQUEST,
  };
};

const createNewFormDetailsSuccess = (result) => {
  return {
    type: CREATE_NEW_FORM_DETAILS_SUCCESS,
    payload: result,
  };
};

const createNewFormDetailsFailed = (result) => {
  return {
    type: CREATE_NEW_FORM_DETAILS_FAILED,
    payload: result,
  };
};

// Update Form Detail
export const updateFormDetails =
  (params = {}) =>
  (dispatch) => {
    dispatch(updateFormDetailsRequest());

    return new Promise((resolve, reject) => {
      updateFormDetailsApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(updateFormDetailsSuccess(result));
          } else {
            dispatch(updateFormDetailsFailed(result));
          }

          resolve();
        })
        .catch((error) => {
          console.log("error : ", error);

          errorHandler(error);
          reject(error);
        });
    });
  };

const updateFormDetailsRequest = () => {
  return {
    type: UPDATE_FORM_DETAILS_REQUEST,
  };
};

const updateFormDetailsSuccess = (result) => {
  return {
    type: UPDATE_FORM_DETAILS_SUCCESS,
    payload: result,
  };
};

const updateFormDetailsFailed = (result) => {
  return {
    type: UPDATE_FORM_DETAILS_FAILED,
    payload: result,
  };
};

// Create Form Detail
export const createFormDetails =
  (params = {}) =>
  (dispatch) => {
    dispatch(createFormDetailsRequest());

    return new Promise((resolve, reject) => {
      createFormDetailsApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(createFormDetailsSuccess(result));
          } else {
            dispatch(createFormDetailsFailed(result));
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

const createFormDetailsRequest = () => {
  return {
    type: CREATE_FORM_DETAIL_REQUEST,
  };
};

const createFormDetailsSuccess = (result) => {
  return {
    type: CREATE_FORM_DETAIL_SUCCESS,
    payload: result,
  };
};

const createFormDetailsFailed = (result) => {
  return {
    type: CREATE_FORM_DETAIL_FAILED,
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

const fetchFormDetailsDataRequest = () => {
  return {
    type: FETCH_FORM_DETAILS_REQUEST,
  };
};

const fetchFormDetailsDataSucess = (result) => {
  return {
    type: FETCH_FORM_DETAILS_SUCCESS,
    payload: result,
  };
};

const fetchFormDetailsDataFailed = (result) => {
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

const fetchFormDetailsSelectedDataRequest = () => {
  return {
    type: FETCH_FORM_DETAILS_SELECTED_REQUEST,
  };
};

const fetchFormDetailsSelectedDataSuccess = (result) => {
  return {
    type: FETCH_FORM_DETAILS_SELECTED_SUCCESS,
    payload: result,
  };
};

const fetchFormDetailsSelectedDataFailed = (result) => {
  return {
    type: FETCH_FORM_DETAILS_SELECTED_FAILED,
    payload: result,
  };
};
