import {
  FORMS_URL,
  FORM_DETAILS_URL,
  FORM_DETAILS_SELECTED_ALL_URL,
  FORM_CREATE_DETAIL_URL,
  FORM_NEW_CREATE_DETAIL_URL,
  FORM_UPDATE_DETAIL_URL,
  MANAGERS_URL,
  OUTLETS_BY_MANAGER_URL,
  TEMPLATES_BY_MANAGER_URL,
  SUPERVISORS_BY_MANAGER_URL,
  STAFFS_BY_SUPERVISOR_URL,
} from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl, formatUrl } from "../utils/helpers";

export const fetchManagersApi = () => {
  let url = new URL(MANAGERS_URL);

  return axiosInstance.post(url, {});
};

export const fetchOutletByManagerApi = (managerId) => {
  let url = new URL(OUTLETS_BY_MANAGER_URL);

  return axiosInstance.post(url, { managerId });
};

export const fetchTemplatesByManagerApi = (managerId) => {
  let url = new URL(TEMPLATES_BY_MANAGER_URL);

  return axiosInstance.post(url, { managerId });
};

export const fetchSupervisorByManagerApi = (managerId, outletId) => {
  let url = new URL(SUPERVISORS_BY_MANAGER_URL);

  return axiosInstance.post(url, { managerId, outletId });
};

export const fetchStaffsBySupervisorApi = (
  supervisorId,
  managerId,
  outletId
) => {
  let url = new URL(STAFFS_BY_SUPERVISOR_URL);

  return axiosInstance.post(url, { supervisorId, managerId, outletId });
};

export const fetchFormsApi = ({ managerId, supervisorId, role, page = 1 }) => {
  let url = new URL(FORMS_URL);

  let parameters = {
    managerId,
    supervisorId,
    role,
    page,
  };

  return axiosInstance.post(url, parameters);
};

export const fetchFormDetailsApi = ({
  managerId,
  staffId,
  page = 1,
  sort = "id",
  order = "desc",
}) => {
  let parameters = {
    sort,
    order,
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

export const createNewFormDetailsApi = ({
  template,
  outlet,
  manager,
  supervisor,
  staff,
  items,
}) => {
  let args = [template, outlet, manager, supervisor, staff];
  let targetUrl = formatUrl(FORM_NEW_CREATE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    items,
    template_id: template,
    outlet_id: outlet,
    manager_id: manager,
    supervisor_id: supervisor,
    staff_id: staff,
  };

  return axiosInstance.post(url, parameters);
};

export const updateFormDetailsApi = ({ form_id, outlet_id, items }) => {
  let args = [outlet_id, form_id];
  let targetUrl = formatUrl(FORM_UPDATE_DETAIL_URL, args);
  let url = new URL(targetUrl);

  let parameters = {
    items,
    outlet_id,
    form_id,
  };

  return axiosInstance.post(url, parameters);
};
