import {
  getDatOffListRequest,
  GetDayOffListParams,
} from "@/apis/modules/schedule";
import { ScheduleRepository } from "@/core/application/infrastructure-interface/repositories/schedule.repo-interface";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

export class ScheduleRepositoryImpl implements ScheduleRepository {
  async getDayOffList(
    params: GetDayOffListParams
  ): Promise<CommonResponse | null> {
    try {
      const response: any = await getDatOffListRequest(params);
      return response;
    } catch (error: any) {
      return error;
    }
  }
}
