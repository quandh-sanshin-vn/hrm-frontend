import { AuthToken } from "@/core/entities/models/authToken.model";
import api from "../request";

export interface LoginParams {
  email: string;
  password: string;
}

export function loginRequest(params: LoginParams) {
  return api.post(`/login`, params);
}

export function logoutRequest() {
  return api.post(`/logout`);
}

export const getUserRequest = async (token: AuthToken) => {
    return api.get('/my-page', {
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
    });
};
