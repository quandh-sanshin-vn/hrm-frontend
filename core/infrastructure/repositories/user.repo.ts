import {
  ChangePasswordParams,
  changePasswordRequest,
} from "@/apis/modules/user";
import { UserRepository } from "@/core/application/infrastructure-interface/repositories/user.repo-interface";
import { Password } from "@/core/entities/models/password.model";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";
import { AxiosError } from "axios";

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
      console.log("--------------", error.response.data.error_code);
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
}
