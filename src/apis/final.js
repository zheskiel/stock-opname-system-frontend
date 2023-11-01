import { FINAL_REPORT_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchFinalFormReportApi = ({ page = 1 }) => {
  let parameters = {
    page,
  };

  let url = new URL(FINAL_REPORT_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const createFinalFormReportApi = () => {
  let parameters = {};

  let url = new URL(FINAL_REPORT_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.post(target);
};
