import { FETCH_WASTE_URL, REPORT_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchReportsApi = () => {
  let url = `${REPORT_URL}`;

  return axiosInstance.get(url);
};

export const fetchWastByTemplateApi = ({ templateId, query = "" }) => {
  let args = [templateId];
  let targetUrl = formatUrl(FETCH_WASTE_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    query,
  };

  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
