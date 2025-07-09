import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { CONSTANTS } from "@constants/external";
import { AuthCasesFactory } from "@presenters/auth.factory";

const api = axios.create({
  baseURL: CONSTANTS.DASHBOARD_BACKEND,
  withCredentials: true,
});

export let apiToken: string | null = null;

export const setApiToken = (token: string | null) => {
  apiToken = token;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers = { ...config.headers } as AxiosHeaders;

    if (apiToken) {
      config.headers.Authorization = `${CONSTANTS.AUTH_METHOD} ${apiToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // Check if error is due to token expiration or invalid token
    if (status === 401 || status === 403) {
      const useCases = AuthCasesFactory.authCases();
      useCases.clearToken.execute();
      // Clean the access token
      apiToken = null;
    }

    return Promise.reject(error);
  }
);

export default api;
