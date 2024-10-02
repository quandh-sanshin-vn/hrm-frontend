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
import { isMobile } from "react-device-detect";

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
    <div className="flex flex-1 w-full h-full max-h-screen overflow-y-none overscroll-none">
      <SideBarComponent />
      <div className="block w-full">
        <StyledHeader />
        <StyledOverlay isVisible={loading} />
        <div className="px-4 w-full flex flex-col">
          <p className=" font-semibold max-w-screen text-[20px]">
            Work Schedule Calendar
          </p>
          <div className="flex flex-1 gap-x-2  max-h-screen w-full ">
            <StyledCalendar type={isMobile ? "single" : "fullyear"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
