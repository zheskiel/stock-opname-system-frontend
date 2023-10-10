import axios from "axios";
import { HIERARCHY_URL } from "./constants";

export const fetchHierarchyDataApi = () => {
  return axios.get(HIERARCHY_URL);
};
