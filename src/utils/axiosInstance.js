import axios from "axios";

let axiosInstance = axios;

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

export default axiosInstance;
