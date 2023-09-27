const prefix = "/";

export const SYSTEM_CONFIG_URL = prefix + "systemConfig";

export const QUIZ_LIST_CONFIG_URL = `${SYSTEM_CONFIG_URL}/QuizListConfig`;
export const QUIZ_LIST_CREATE_URL = `${QUIZ_LIST_CONFIG_URL}/Create`;
export const QUIZ_LIST_DETAIL_URL = `${QUIZ_LIST_CONFIG_URL}/Detail`;
export const QUIZ_LIST_EDIT_URL = `${QUIZ_LIST_CONFIG_URL}/Edit`;

export const USER_QUIZ_LIST_CONFIG_URL = `${SYSTEM_CONFIG_URL}/UserQuizListConfig`;

export const USER_INTENTION_EXPORT_URL = `${SYSTEM_CONFIG_URL}/UserIntention`;
export const INFORMATION_CONFIG_URL = `${SYSTEM_CONFIG_URL}/InformationConfig`;
