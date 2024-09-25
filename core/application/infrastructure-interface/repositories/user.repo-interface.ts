import { GetStaffListParams } from "@/apis/modules/user";
import { Password } from "@/core/entities/models/password.model";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

export interface UserRepository {
  changePassword(password: Password): Promise<CommonResponse | null>;
  getStaffList(params: GetStaffListParams): Promise<CommonResponse | null>;
}
