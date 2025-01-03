import { MASTER_URL } from "./constants";

import axiosInstance from "../utils/axiosInstance";
import { buildUrl } from "../utils/helpers";

export const fetchMasterApi = ({ page = 1, sort = "id", order = "asc" }) => {
  let parameters = {
    sort,
    order,
    page,
  };

  let url = new URL(MASTER_URL);
  let target = buildUrl(url, parameters);

  return axiosInstance.get(target);
};
