import {
  ChangePasswordParams,
  changePasswordRequest,
} from "@/apis/modules/user";
import { UserRepository } from "@/core/application/infrastructure-interface/repositories/user.repo-interface";
import { Password } from "@/core/entities/models/password.model";

export class UserRepositoryImpl implements UserRepository {
  async changePassword(password: Password): Promise<any | null> {
    try {
      const params: ChangePasswordParams = {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      };
      const response = await changePasswordRequest(params);
      console.log("-------", response);
      const {} = response.data;
    } catch (error) {}
  }
}
