import { CommonResponse } from "@/core/entities/models/responseCommon.model";
import { ACCESS_TOKEN_KEY } from "@/utilities/static-value";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const BASE_URL = process.env.BASE_URL;
const api = axios.create({
  baseURL: "http://192.168.1.171:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = getCookie(ACCESS_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    } else {
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      response.data.formattedResponse = {
        data: response?.data?.data,
        code: response?.data?.code,
        message: response?.data?.message || "",
        requestStatus: response.status,
        totalItem: response?.data?.total
      };
      return response.data.formattedResponse;
    }
    // return {
    //   errorCode: response.data.code,
    //   errorMessage: response.data.message,
    // };
    return Promise.reject(formatErrorResponse(response.data));
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.replace(`/login`);
      deleteCookie(ACCESS_TOKEN_KEY);
    }
    return Promise.reject(formatErrorResponse(error));
  }
);

export default api;

function formatErrorResponse(error: any): CommonResponse {
  return {
    data: error.response?.data || [],
    code: error.response?.code || 1,
    message: error.response?.message || "",
    requestStatus: error.response?.status || 500,
    errorCode: error?.data?.error_code || 0,
    totalItem: 0,
  };
}
