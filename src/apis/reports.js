import axios from "axios";

import { REPORT_URL } from "./constants";

export const fetchReportsApi = () => {
  let url = `${REPORT_URL}`;

  return axios.get(url);
};
