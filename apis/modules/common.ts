import { AuthToken } from "@/core/entities/models/authToken.model";
import api from "../request";

export interface PositionResponse {
  id: number | string;
  name: string;
}

export function getPositionRequest(token: AuthToken) {
  return api.get(`/positions`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
}

export interface DepartmentResponse {
  id: number | string;
  name: string;
}

export function getDepartmentRequest(token: AuthToken) {
  return api.get(`/departments`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
}
