// export const API_URL = "http://stockopname:8888/api/v1";
export const API_URL = "http://127.0.0.1:8000/api/v1";

// export const LOGIN_URL = API_URL + "/login";
export const LOGOUT_URL = API_URL + "/logout";

export const HIERARCHY_URL = API_URL + "/hierarchy";
export const MASTER_URL = API_URL + "/master";

export const FORMS_URL = API_URL + "/forms";
export const FORM_DETAILS_URL = API_URL + "/form/{0}/{1}/details";
export const FORM_DETAILS_SELECTED_ALL_URL = API_URL + "/form/{0}/{1}/all";
export const FORM_CREATE_DETAIL_URL = API_URL + `/form/{0}/{1}/create-detail`;
export const FORM_REMOVE_DETAIL_URL = API_URL + `/form/{0}/{1}/remove-detail`;
export const FORM_REMOVE_ALL_DETAIL_URL =
  API_URL + `/form/{0}/{1}/remove-all-detail`;

export const TEMPLATES_URL = API_URL + "/templates";
export const TEMPLATE_VIEW_URL = API_URL + `/template/{0}/view`;
export const TEMPLATE_SELECTED_ALL_URL = API_URL + `/template/{0}/all`;
export const TEMPLATE_CREATE_DETAIL_URL =
  API_URL + `/template/{0}/create-detail`;

export const TEMPLATE_REMOVE_DETAIL_URL =
  API_URL + `/template/{0}/remove-detail`;

export const TEMPLATE_REMOVE_ALL_DETAIL_URL =
  API_URL + `/template/{0}/remove-all-detail`;
