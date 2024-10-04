import api from "../request";

export interface GetDayOffListParams {
  current_year?: number;
  country?: string;
}

export function getDatOffListRequest(params: GetDayOffListParams) {
  return api.get(`/calendar`, { params });
}

export interface GetDayOffParams {
  id?: number;
}

export function getDatOffRequest(params: GetDayOffParams) {
  return api.get(`/day-off`, { params });
}

export interface CreateDayOffParams {
  title: string;
  description: string;
  day_off: string;
  status: string;
}

export function createDayOffRequest(params: CreateDayOffParams) {
  return api.post(`/day-off`, params);
}

export interface UpdateDayOffParams {
  id: number | string;
  title: string;
  description: string;
  day_off: string;
  status: "0" | "1";
  updated_at: string;
}

export function updateDayOffRequest(params: UpdateDayOffParams) {
  return api.put(`/day-off`, params);
}
