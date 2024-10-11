import api from "../request";

export interface GetLeaveListParams {
  page?: number;
  sort_by?: string;
  sort_order?: string;
  status?: string;
  leave_type?: string;
  employee_name?: string;
  limit?: number;
  create_date?: string | Date;
  leave_date?: string | Date;
  can_request?: string;
}

export function getLeaveListRequest(params: GetLeaveListParams) {
  return api.get(`/leaves`, { params });
}

// export interface GetDayOffParams {
//   id?: number;
// }

// export function getDatOffRequest(params: GetDayOffParams) {
//   return api.get(`/day-off`, { params });
// }

// export interface CreateDayOffParams {
//   title: string;
//   description: string;
//   day_off: string;
//   status: string;
// }

// export function createDayOffRequest(params: CreateDayOffParams) {
//   return api.post(`/day-off`, params);
// }

// export interface UpdateDayOffParams {
//   id: number | string;
//   title: string;
//   description: string;
//   day_off: string;
//   status: "0" | "1";
//   updated_at: string;
// }

// export function updateDayOffRequest(params: UpdateDayOffParams) {
//   return api.put(`/day-off`, params);
// }
