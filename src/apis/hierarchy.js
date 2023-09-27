import axios from "axios";
import { HIERARCHY_URL } from "./constants";

export const hierarchyApi = () => {
  return axios.get(HIERARCHY_URL);
};
