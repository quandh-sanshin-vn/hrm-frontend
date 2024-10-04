"use client";
import StyledCalendar from "@/components/calendar/StyledCalendar";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import { useDetectDevice } from "@/hooks/use-detect-device";
import { isMobile } from "react-device-detect";

function MainScreen() {
  useDetectDevice();
  return (
    <div className="flex flex-1 w-full h-full max-h-screen overflow-y-none overscroll-none">
      <SideBarComponent />
      <div className="block w-full">
        <StyledHeader />
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
