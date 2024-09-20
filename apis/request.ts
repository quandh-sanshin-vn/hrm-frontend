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
      // const token = getCookie(ACCESS_TOKEN_KEY);
      // if (token) {
      //   config.headers.Authorization = "Bearer " + token;
      // }
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
      return response.data;
    }
    return {
      errorCode: response.data.code,
      errorMessage: response.data.message,
    };
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // window.location.replace(`/login`);
      // deleteCookie(ACCESS_TOKEN_KEY);
    }
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.status,
    });
  }
);

export default api;
