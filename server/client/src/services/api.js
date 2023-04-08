import axios from "axios";
import { API_NOTIFICATION_MESSEGES, SERVICE_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";

const API_URL = '';
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  // stops global loader here
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(ProcessError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data, status: response?.status };
  }  else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const ProcessError = (error) => {
  if (error.response) {
    console.log("ERROR IN REQUEST", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSEGES.responseFailureServer,
      code: error.response.status,
    };
  } else if (error.request) {
    console.log("ERROR IN REQUEST", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSEGES.responseFailure,
      code: "",
    };
  } else {
    console.log("ERROR IN NETWORK", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSEGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
    });
}

export { API };
