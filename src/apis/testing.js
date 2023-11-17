import {
  TESTING_OUTLET_URL,
  TESTING_STAFF_FORMS_URL,
  TESTING_FORM_BY_STAFF_ID_URL,
  TESTING_CREATE_DAILY_REPORT_FORM_URL,
  FETCH_SUPERVISOR_BY_OUTLET_URL,
} from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const createDailyFormReportApi = ({ formId, date, items }) => {
  let args = [];
  let targetUrl = formatUrl(TESTING_CREATE_DAILY_REPORT_FORM_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    formId,
    date,
    items,
  };

  return axiosInstance.post(url, parameters);
};

export const fetchStaffFormsApi = ({ outletId, managerId }) => {
  let parameters = {};

  let args = [managerId, outletId];
  let newUrl = formatUrl(TESTING_STAFF_FORMS_URL, args);

  let url = new URL(newUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const fetchFormByStaffApi = ({ managerId, staffId, page = 1 }) => {
  let parameters = {
    page,
  };

  let args = [managerId, staffId];
  let newUrl = formatUrl(TESTING_FORM_BY_STAFF_ID_URL, args);

  let url = new URL(newUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const fetchOutletsApi = () => {
  let parameters = {};

  let url = new URL(TESTING_OUTLET_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const fetchSupervisorsByOutletApi = ({ outletId }) => {
  let args = [];
  let targetUrl = formatUrl(FETCH_SUPERVISOR_BY_OUTLET_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    outletId,
  };

  return axiosInstance.post(url, parameters);
};
