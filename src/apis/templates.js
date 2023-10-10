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
  let args = [templateId];
  let targetUrl = formatUrl(TEMPLATE_CREATE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  let { units } = item;

  let parameters = {
    ...item,
    template_id: templateId,
    units: JSON.stringify(units),
  };

  return axiosInstance.post(url, parameters);
};

export const removeTemplateDetailApi = ({
  templateId,
  productId,
  currentPage,
}) => {
  let parameters = {
    current_page: currentPage,
    template_id: templateId,
    product_id: productId,
  };

  let args = [templateId];
  let targetUrl = formatUrl(TEMPLATE_REMOVE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  return axiosInstance.post(url, parameters);
};