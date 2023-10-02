import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

window.axios = require("axios");

window.axios.interceptors.response.use(
  function (response) {
    if (response.status == 200) {
      return response.data;
    } else {
      return response;
    }
  },
  function (error) {
    if (401 === error.response.status) {
      return error.response.data;
    } else {
      return Promise.reject(error);
    }
  }
);
