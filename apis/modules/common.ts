import api from "../request";

export interface PositionResponse {
  id: number | string;
  name: string;
}

export function getPositionRequest() {
  return api.get(`/positions`);
}
