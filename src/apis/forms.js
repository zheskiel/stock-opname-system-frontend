import {
  FORMS_URL,
  FORM_DETAILS_URL,
  FORM_DETAILS_SELECTED_ALL_URL,
  FORM_CREATE_DETAIL_URL,
  FORM_REMOVE_DETAIL_URL,
} from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchFormsApi = ({ page = 1 }) => {
  let parameters = {
    page,
  };

  let url = new URL(FORMS_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const fetchFormDetailsApi = ({ managerId, staffId, page = 1 }) => {
  let parameters = {
    page,
  };

  let args = [managerId, staffId];
  let newUrl = formatUrl(FORM_DETAILS_URL, args);

  let url = new URL(newUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const fetchFormDetailsAllSelectedApi = ({ managerId, staffId }) => {
  let parameters = {};

  let args = [managerId, staffId];
  let targetUrl = formatUrl(FORM_DETAILS_SELECTED_ALL_URL, args);

  let url = new URL(targetUrl);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};

export const createFormDetailApi = ({
  managerId,
  staffId,
  item,
  selectedUnit,
}) => {
  let args = [managerId, staffId];
  let targetUrl = formatUrl(FORM_CREATE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    ...item,
    selected_unit: selectedUnit,
    manager_id: managerId,
    staff_id: staffId,
  };

  return axiosInstance.post(url, parameters);
};

export const removeFormDetailApi = ({
  currentPage,
  managerId,
  staffId,
  productId,
  itemId,
}) => {
  let parameters = {
    current_page: currentPage,
    product_id: productId,
    manager_id: managerId,
    staff_id: staffId,
    item_id: itemId,
  };

  let args = [managerId, staffId, productId, itemId];
  let targetUrl = formatUrl(FORM_REMOVE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  return axiosInstance.post(url, parameters);
};