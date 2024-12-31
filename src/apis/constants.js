// export const API_URL = "http://stockopname:8888/api/v1";
// export const API_URL = "http://127.0.0.1:8000/api/v1";
export const API_URL = "http://178.128.121.143/api/v1";

// export const LOGIN_URL = API_URL + "/login";
export const LOGOUT_URL = API_URL + "/logout";

export const HIERARCHY_URL = API_URL + "/hierarchy";
export const MASTER_URL = API_URL + "/master";

export const MANAGERS_URL = API_URL + "/forms/managers";
export const OUTLETS_BY_MANAGER_URL = API_URL + "/forms/outlets";
export const SUPERVISORS_BY_MANAGER_URL = API_URL + "/forms/supervisors";
export const TEMPLATES_BY_MANAGER_URL = API_URL + "/forms/templates";
export const STAFFS_BY_SUPERVISOR_URL = API_URL + "/forms/staffs";

export const FORMS_URL = API_URL + "/forms";

export const FORM_DETAILS_URL = API_URL + "/form/{0}/staff/{1}/details";
export const FORM_DETAILS_SELECTED_ALL_URL =
  API_URL + "/form/{0}/staff/{1}/all";

export const FORM_NEW_CREATE_DETAIL_URL =
  API_URL +
  `/form/template/{0}/outlet/{1}/manager/{2}/supervisor/{3}/staff/{4}/create`;
export const FORM_UPDATE_DETAIL_URL = API_URL + "/form/{0}/outlet/{1}";

export const COMBINED_FORMS_URL = API_URL + "/form/{0}/outlet/{1}/combined";

export const TEMPLATES_URL = API_URL + "/templates";
export const TEMPLATE_VIEW_URL = API_URL + `/template/{0}/view`;
export const TEMPLATE_SELECTED_ALL_URL = API_URL + `/template/{0}/all`;
export const TEMPLATE_CREATE_DETAIL_URL =
  API_URL + `/template/{0}/create-detail`;
export const TEMPLATE_CREATE_BY_OUTLET_URL = API_URL + "/template/create";
export const TEMPLATE_UPDATE_BY_OUTLET_URL = API_URL + "/template/{0}/update";

export const TEMPLATE_REMOVE_DETAIL_URL =
  API_URL + `/template/{0}/remove-detail`;

export const REPORT_URL = API_URL + "/reports";
export const CREATE_REPORT_URL = API_URL + "/reports/create";
export const FETCH_WASTE_URL = API_URL + `/fetch/{0}/waste`;
export const FETCH_COMPARE_WASTE_URL = API_URL + `/form/compare/{0}/waste`;
export const STOCK_POSITION_REPORT_URL = API_URL + `/form/position/report`;
export const FINAL_REPORT_URL = API_URL + `/form/final`;

export const FETCH_SUPERVISOR_BY_OUTLET_URL = API_URL + `/outlet/supervisors`;

export const TESTING_OUTLET_URL = API_URL + `/outlet`;
export const TESTING_STAFF_FORMS_URL =
  API_URL + `/testing/manager/{0}/outlet/{1}/forms`;
export const TESTING_FORM_BY_STAFF_ID_URL =
  API_URL + `/testing/manager/{0}/staff/{1}/form`;
export const TESTING_CREATE_DAILY_REPORT_FORM_URL = API_URL + "/testing/forms";
