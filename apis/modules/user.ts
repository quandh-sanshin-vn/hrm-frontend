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
