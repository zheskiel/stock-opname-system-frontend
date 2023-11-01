import { STOCK_POSITION_REPORT_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const createStockPositionReportApi = (file) => {
  let formData = new FormData();

  formData.append("file", file);

  let args = [];
  let targetUrl = formatUrl(STOCK_POSITION_REPORT_URL, args);
  let url = new URL(targetUrl);

  return axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchStockPositionReportApi = ({ page = 1 }) => {
  let parameters = {
    page,
  };

  let url = new URL(STOCK_POSITION_REPORT_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
