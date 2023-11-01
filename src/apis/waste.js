import { FETCH_COMPARE_WASTE_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchCompareWasteApi = ({ templateId, page = 1 }) => {
  let parameters = {
    page,
  };

  let args = [templateId];
  let targetUrl = formatUrl(FETCH_COMPARE_WASTE_URL, args);
  let url = new URL(targetUrl);

  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
