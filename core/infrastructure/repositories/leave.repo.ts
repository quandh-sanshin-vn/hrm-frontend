import { GetLeaveDetailParams, getLeaveDetailRequest, GetLeaveListParams, getLeaveListRequest } from "@/apis/modules/leave";
import { LeaveRepository } from "@/core/application/infrastructure-interface/repositories/leave.repo-interface";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

export class LeaveRepositoryImpl implements LeaveRepository {
  async getLeaveDetail(params: GetLeaveDetailParams): Promise<CommonResponse | null> {
    try {
        const response : any = await getLeaveDetailRequest(params)
        return response
    }catch (error: any) {
      return error;
    }
  }
  async getLeaveList(
    params: GetLeaveListParams
  ): Promise<CommonResponse | null> {
    try {
      const response: any = await getLeaveListRequest(params);
      return response;
    } catch (error: any) {
      return error;
    }
  }
}
