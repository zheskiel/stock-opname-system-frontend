import axios from "axios";
import { MASTER_URL } from "./constants";

export const getMasterApi = (page = 1) => {
  let parameters = {};

  parameters.page = page;

  let url = MASTER_URL + "?page=" + page;

  return axios.get(url);
};
