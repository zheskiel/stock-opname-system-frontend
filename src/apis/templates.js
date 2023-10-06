import {
  TEMPLATES_URL,
  TEMPLATE_VIEW_URL,
  TEMPLATE_SELECTED_ALL_URL,
  TEMPLATE_CREATE_DETAIL_URL,
  TEMPLATE_REMOVE_DETAIL_URL,
} from "./constants";

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

export const fetchTemplateAllSelectedApi = ({ templateId }) => {
  let parameters = {};

  let args = [templateId];
  let targetUrl = formatUrl(TEMPLATE_SELECTED_ALL_URL, args);

  let url = new URL(targetUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const createTemplateDetailApi = ({ templateId, item }) => {
  let parameters = {};

  let args = [templateId];
  let targetUrl = formatUrl(TEMPLATE_CREATE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  if (templateId != null) {
    parameters.template_id = templateId;
  }

  const { product_id, product_code, product_name, units, receipt_tolerance } =
    item;

  parameters.product_id = product_id;
  parameters.product_code = product_code;
  parameters.product_name = product_name;
  parameters.receipt_tolerance = receipt_tolerance;
  parameters.units = JSON.stringify(units);

  return axiosInstance.post(url, parameters);
};

export const removeTemplateDetailApi = ({ templateId, productId }) => {
  let parameters = {};

  let args = [templateId];
  let targetUrl = formatUrl(TEMPLATE_REMOVE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  parameters.template_id = templateId;
  parameters.product_id = productId;

  return axiosInstance.post(url, parameters);
};
