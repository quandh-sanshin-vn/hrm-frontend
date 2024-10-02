import { GetDayOffListParams } from "@/apis/modules/schedule";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

export interface ScheduleRepository {
  getDayOffList(params: GetDayOffListParams): Promise<CommonResponse | null>;
  //   getProfile(): Promise<CommonResponse | null>;
  //   createNewStaff(params: CreateUsersParams): Promise<CommonResponse | null>;
  //   editStaff(params: UpdateUsersParams): Promise<CommonResponse | null>;
  //   deleteStaff(params: DeleteUsersParams): Promise<CommonResponse | null>;
}
