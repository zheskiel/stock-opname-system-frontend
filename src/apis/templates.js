import { TEMPLATES_URL, TEMPLATE_VIEW_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchTemplatesApi = ({ page = 1 }) => {
  let parameters = {
    page,
  };

  let url = new URL(TEMPLATES_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const fetchTemplateViewApi = ({ templateId, page = 1 }) => {
  let parameters = {
    page,
  };

  let args = [templateId];
  let templateViewUrl = formatUrl(TEMPLATE_VIEW_URL, args);

  let url = new URL(templateViewUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
