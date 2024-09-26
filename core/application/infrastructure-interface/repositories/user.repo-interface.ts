import {
  CreateUsersParams,
  DeleteUsersParams,
  GetStaffListParams,
  UpdateUsersParams,
} from "@/apis/modules/user";
import { Password } from "@/core/entities/models/password.model";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";
import { User } from "@/core/entities/models/user.model";

export interface UserRepository {
  changePassword(password: Password): Promise<CommonResponse | null>;
  getStaffList(params: GetStaffListParams): Promise<CommonResponse | null>;
  getProfile(): Promise<CommonResponse | null>;
  createNewStaff(params: CreateUsersParams): Promise<CommonResponse | null>;
  editStaff(params: UpdateUsersParams): Promise<CommonResponse | null>;
  deleteStaff(params: DeleteUsersParams): Promise<CommonResponse | null>;
}
