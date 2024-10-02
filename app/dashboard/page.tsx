"use client";
import { GetDayOffListParams } from "@/apis/modules/schedule";
import StyledCalendar from "@/components/calendar/StyledCalendar";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import StyledOverlay from "@/components/common/StyledOverlay";
import { GetDayOffListUseCase } from "@/core/application/usecases/schedule/getDayOffList";
import { ScheduleRepositoryImpl } from "@/core/infrastructure/repositories/schedule.repo";
import { useDetectDevice } from "@/hooks/use-detect-device";
import { useScheduleStore } from "@/stores/scheduleStore";
import { getYear } from "date-fns";
import { useEffect, useState } from "react";
const scheduleRepo = new ScheduleRepositoryImpl();
const getDayOffListUseCase = new GetDayOffListUseCase(scheduleRepo);

function MainScreen() {
  const [loading, setLoading] = useState(false);
  const { updateDayOffListData } = useScheduleStore((state) => state);
  useDetectDevice();
  useEffect(() => {
    onFirstLoad();
  }, []);

  const onFirstLoad = async () => {
    try {
      setLoading(true);
      const params: GetDayOffListParams = {
        current_year: getYear(new Date()),
        country: "VN",
      };
      const response = await getDayOffListUseCase.execute(params);
      if (!response?.data?.day_offs && response?.data.day_offs.length === 0)
        return;

      updateDayOffListData(response?.data?.day_offs || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex max-h-screen">
      <SideBarComponent />
      <div className="block max-h-screen w-full">
        <StyledHeader />
        <StyledOverlay isVisible={loading} />
        <div className="px-4">
          <p className=" font-semibold text-[20px]">Work Schedule Calendar </p>
          <StyledCalendar type="single" />
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
