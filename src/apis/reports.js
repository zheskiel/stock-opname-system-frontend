import { FETCH_WASTE_URL, REPORT_URL, CREATE_REPORT_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchReportsApi = () => {
  let url = `${REPORT_URL}`;

  return axiosInstance.get(url);
};

export const createReportsApi = ({ items, notes }) => {
  let args = [];
  let targetUrl = formatUrl(CREATE_REPORT_URL, args);
  let url = new URL(targetUrl);

  let parameters = { items, notes };

  return axiosInstance.post(url, parameters);
};

export const fetchWasteByTemplateApi = ({ templateId, query = "" }) => {
  let args = [templateId];
  let targetUrl = formatUrl(FETCH_WASTE_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    query,
  };

  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
