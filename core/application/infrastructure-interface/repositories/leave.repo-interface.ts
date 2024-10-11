import { GetLeaveListParams } from "@/apis/modules/leave";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

export interface LeaveRepository {
  getLeaveList(params: GetLeaveListParams): Promise<CommonResponse | null>;
}
