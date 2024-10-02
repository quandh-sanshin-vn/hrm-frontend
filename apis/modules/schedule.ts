import api from "../request";

export interface GetDayOffListParams {
  current_year?: number;
  country?: string;
}

export function getDatOffListRequest(params: GetDayOffListParams) {
  return api.get(`/calendar`, { params });
}
