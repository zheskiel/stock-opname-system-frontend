import { MASTER_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl } from "../utils/helpers";

export const getMasterApi = ({ page = 1 }) => {
  let parameters = {
    page,
  };

  let url = new URL(MASTER_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
