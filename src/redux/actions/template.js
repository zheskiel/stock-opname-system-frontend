import {
  CREATE_TEMPLATE_DETAIL_REQUEST,
  CREATE_TEMPLATE_DETAIL_SUCCESS,
  CREATE_TEMPLATE_DETAIL_FAILED,
  REMOVE_TEMPLATE_DETAIL_REQUEST,
  REMOVE_TEMPLATE_DETAIL_SUCCESS,
  REMOVE_TEMPLATE_DETAIL_FAILED,
  FETCH_TEMPLATE_VIEW_REQUEST,
  FETCH_TEMPLATE_VIEW_SUCCESS,
  FETCH_TEMPLATE_VIEW_FAILED,
  FETCH_TEMPLATE_SELECTED_REQUEST,
  FETCH_TEMPLATE_SELECTED_SUCCESS,
  FETCH_TEMPLATE_SELECTED_FAILED,
  RESET_TEMPLATE_SELECTED,
  RESET_TEMPLATE_VIEW,
} from "./types";

import {
  createTemplateDetailApi,
  removeTemplateDetailApi,
  fetchTemplateViewApi,
  fetchTemplateAllSelectedApi,
} from "../../apis";

import errorHandler from "../../utils/errHandler";

// Create Template Detail
export const createTemplateDetail =
  (params = {}) =>
  (dispatch) => {
    dispatch(createTemplateDetailRequest());

    return new Promise((resolve, reject) => {
      createTemplateDetailApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(createTemplateDetailSuccess(result));
          } else {
            dispatch(createTemplateDetailFailed(result));
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
const createTemplateDetailRequest = () => {
  return {
    type: CREATE_TEMPLATE_DETAIL_REQUEST,
  };
};
const createTemplateDetailSuccess = (result) => {
  return {
    type: CREATE_TEMPLATE_DETAIL_SUCCESS,
    payload: result,
  };
};
const createTemplateDetailFailed = (result) => {
  return {
    type: CREATE_TEMPLATE_DETAIL_FAILED,
    payload: result,
  };
};

// Remove Template Detail
export const removeTemplateDetail =
  (params = {}) =>
  (dispatch) => {
    dispatch(removeTemplateDetailRequest());

    return new Promise((resolve, reject) => {
      removeTemplateDetailApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(removeTemplateDetailSuccess(result));
          } else {
            dispatch(removeTemplateDetailFailed(result));
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

const removeTemplateDetailRequest = () => {
  return {
    type: REMOVE_TEMPLATE_DETAIL_REQUEST,
  };
};

const removeTemplateDetailSuccess = (result) => {
  return {
    type: REMOVE_TEMPLATE_DETAIL_SUCCESS,
    payload: result,
  };
};

const removeTemplateDetailFailed = (result) => {
  return {
    type: REMOVE_TEMPLATE_DETAIL_FAILED,
    payload: result,
  };
};

// Fetch Template View Data

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

const fetchTemplateViewDataRequest = () => {
  return {
    type: FETCH_TEMPLATE_VIEW_REQUEST,
  };
};

const fetchTemplateViewDataSuccess = (result) => {
  return {
    type: FETCH_TEMPLATE_VIEW_SUCCESS,
    payload: result,
  };
};

const fetchTemplateViewDataFailed = (result) => {
  return {
    type: FETCH_TEMPLATE_VIEW_FAILED,
    payload: result,
  };
};

export const resetTemplateViewData = () => {
  return {
    type: RESET_TEMPLATE_VIEW,
  };
};

export const resetTemplateSelectedData = () => {
  return {
    type: RESET_TEMPLATE_SELECTED,
  };
};

// Fetch Template Selected Data

export const fetchTemplateSelectedData =
  (params = {}) =>
  (dispatch) => {
    dispatch(fetchTemplateSelectedDataRequest());

    return new Promise((resolve, reject) => {
      fetchTemplateAllSelectedApi(params)
        .then((response) => response)
        .then((result) => {
          if (result.success === true) {
            dispatch(fetchTemplateSelectedDataSuccess(result));
          } else {
            dispatch(fetchTemplateSelectedDataFailed(result));
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

const fetchTemplateSelectedDataRequest = () => {
  return {
    type: FETCH_TEMPLATE_SELECTED_REQUEST,
  };
};

const fetchTemplateSelectedDataSuccess = (result) => {
  return {
    type: FETCH_TEMPLATE_SELECTED_SUCCESS,
    payload: result,
  };
};

const fetchTemplateSelectedDataFailed = (result) => {
  return {
    type: FETCH_TEMPLATE_SELECTED_FAILED,
    payload: result,
  };
};
