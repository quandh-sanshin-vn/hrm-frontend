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

export interface GetStaffListParams {
  page?: number;
  sort_by?: string;
  sort_order?: string;
  position?: string;
  status?: number;
  type?: number;
  employee_name?: string;
  limit?: number;
}

export function getStaffListRequest(params: GetStaffListParams) {
  return api.get(`/users`, { params });
}

export interface DeleteUsersParams {
  id: string;
  updated_at: string;
}

export function deleteStaffRequest(params: DeleteUsersParams) {
  return api.delete(`/user`, { params });
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

export function createStaffRequest(params: CreateUsersParams) {
  return api.post(`/users`, params);
}

export interface UpdateUsersParams {
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

export function updateStaffRequest(params: UpdateUsersParams) {
  return api.put(`/users`, params);
}

export function getProfileRequest() {
  return api.get('/my-page')
}