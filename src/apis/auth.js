import axios from "axios";

import { API_URL } from "./constants";

export const loginApi = (email, password, type) => {
  let url = `${API_URL}/${type}/login`;

  return axios.post(url, { email, password, type });
};
