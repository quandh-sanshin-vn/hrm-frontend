import api from "../request";

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export function changePasswordRequest(params: ChangePasswordParams) {
  return api.post(`/change-password`, {
    current_password: params.currentPassword,
    new_password: params.newPassword,
  });
}

export interface GetUsersListParams {
  page: string;
  sort_by: string;
  sort_order: string;
  position: string;
  status: string;
  type: string;
  employee_name: string;
}

export function getStaffListRequest(params: GetUsersListParams) {
  return api.get(`/users`, { params });
}

export interface GetUsersParams {
  id: string;
  updated_at: string;
}

export function getStaffRequest(params: GetUsersParams) {
  return api.get(`/user`, { params });
}

export interface CreateUsersParams {
  fullname: string;
  phone: string;
  birth_day: string;
  address: string;
  country: string;
  username: string;
  status_working: string;
  email: string;
  position: string;
  started_at: string;
  department_ids: string;
  updated_at: string;
}

export function createStaffRequest(params: GetUsersParams) {
  return api.post(`/users`, params);
}

export interface CreateUsersParams {
  id: string;
  idkey: string;
  fullname: string;
  phone: string;
  birth_day: string; // d/m/Y && before:today
  address: string;
  country: string;
  username: string;
  status_working: string;
  email: string;
  position: string;
  started_at: string;
  department_ids: string;
  updated_at: string;
}

export function updateStaffRequest(params: GetUsersParams) {
  return api.put(`/users`, params);
}
