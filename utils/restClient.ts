import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import memoize from "p-memoize";

const successInterceptor = (response: AxiosResponse) => response.data;

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
    console.error("Headers:", error.response.headers);

    if (error.response.status === 401 || error.response.status === 403) {
      window.localStorage.removeItem("_token");
      if (window.location.pathname !== "/login") window.location.href = "/";
    }
  } else {
    console.error("Error Message:", error.message);
  }
  return Promise.reject(error.response || error.message);
};

const requestInterceptor = (config: AxiosRequestConfig) => {
  try {
    const token = window.localStorage.getItem("_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    console.error("Request error! Check localStorage access");
  }
  return config;
};

export const restClient = (host?: string) => {
  const axiosInstance = axios.create({
    headers: { Accept: "application/json" },
    baseURL: host,
  });
  axiosInstance.interceptors.response.use(successInterceptor, errorInterceptor);
  axiosInstance.interceptors.request.use(requestInterceptor);
  return axiosInstance;
};

export const getRestClient = memoize(async (host?: string) => restClient(host));
