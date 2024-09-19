import { AuthServiceImpl } from "@/core/infrastructure/services/auth.service";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const BASE_URL = process.env.BASE_URL;
const authService = new AuthServiceImpl();
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
    const token = authService.getToken();
    console.log("===========", token);
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error: any) => {
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
      window.location.replace(
        `/cms/login?company_cd=${getCookie("company_cd")}`
      );
      deleteCookie("token");
    }
    // check conditions to refresh token if needed
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response?.data,
    });
  }
);

export default api;
