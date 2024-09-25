import {
  ChangePasswordParams,
  changePasswordRequest,
  getStaffListRequest,
  GetStaffListParams,
} from "@/apis/modules/user";
import { UserRepository } from "@/core/application/infrastructure-interface/repositories/user.repo-interface";
import { Password } from "@/core/entities/models/password.model";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

export class UserRepositoryImpl implements UserRepository {
  async changePassword(password: Password): Promise<CommonResponse | null> {
    try {
      const params: ChangePasswordParams = {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      };
      const response: any = await changePasswordRequest(params);
      const formattedResponse: CommonResponse = {
        data: response?.data,
        code: response?.code,
        message: response?.message || "",
        requestStatus: response.status,
      };
      return formattedResponse;
    } catch (error: any) {
      const formattedResponse: CommonResponse = {
        data: error.response?.data || [],
        code: error.response?.code || 1,
        message: error.response?.message,
        requestStatus: error.status,
        errorCode: error?.data?.error_code || 0,
      };
      return formattedResponse;
    }
  }

  async getStaffList(
    params: GetStaffListParams
  ): Promise<CommonResponse | null> {
    try {
      const response: any = await getStaffListRequest(params);
      const formattedResponse: CommonResponse = {
        data: response?.data,
        code: response?.code,
        message: response?.message || "",
        requestStatus: response.status,
        totalItem: response.total,
      };
      return formattedResponse;
    } catch (error: any) {
      const formattedResponse: CommonResponse = {
        data: error.response?.data || [],
        code: error.response?.code || 1,
        message: error.response?.message,
        requestStatus: error.status,
        errorCode: error?.data?.error_code || 0,
        totalItem: 0,
      };
      return formattedResponse;
    }
  }
}
