import axios from "axios";

const defaultOptions = {
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = (overrideConfig = {}) => {
  let axiosConfig = {
    ...defaultOptions,
    ...overrideConfig,
  };

  let instance = axios.create(axiosConfig);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  });

  return instance;
};

export default axiosInstance();
