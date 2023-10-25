import { COMBINED_FORMS_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchCombinedFormsApi = ({ managerId, outletId, page = 1 }) => {
  let parameters = { page };

  let args = [managerId, outletId];
  let targetUrl = formatUrl(COMBINED_FORMS_URL, args);

  let url = new URL(targetUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
