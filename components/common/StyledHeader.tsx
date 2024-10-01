import Image from "next/image";
import React, { useState } from "react";
import GoodMorningIcon from "../../app/assets/icons/iconSunrise.png";
import GoodAfternoonIcon from "../../app/assets/icons/iconSunset.png";
import AppsIcon from "../../app/assets/icons/iconApps.svg";
import { isMorningTime } from "@/utilities/helper";
import ToggleIcon from "../../app/assets/icons/iconToggleSideBar.png";
import { useCommonStore } from "@/stores/commonStore";
import { AlertDialogLogoutButton } from "@/components/common/AlertDialogLogoutButton";

export default function StyledHeader() {
  // const [isOpen, setIsOpen] = useState(true);
  const { sidebarStatus, updateSideBarStatus } = useCommonStore();

  const toggleSidebar = () => {
    updateSideBarStatus(!sidebarStatus);
  };

  return (
    <div className="h-[100px] w-full px-4 py-4 flex items-start">
      <div
        className=" visible laptop:invisible flex items-center justify-center h-10 rounded-none px-0 pt-1 hover:cursor-pointer"
        onClick={toggleSidebar}
      >
        {!sidebarStatus && <Image src={AppsIcon} alt="" className="h-6 w-6" />}
      </div>
      <div className="flex-1 flex-col px-2 justify-between">
        <p className="text-[18px] laptop:text-[30px] font-semibold">
          Welcome Umezaki 👋
        </p>
        <div className="flex items-center">
          <Image
            src={isMorningTime() ? GoodMorningIcon : GoodAfternoonIcon}
            alt=""
            className="h-4 w-4 mr-2"
          />
          <p className="text-[14px] text-secondary">
            {isMorningTime() ? "Good Morning" : "Good Afternoon"}
          </p>
        </div>
      </div>
      <div className="laptop:hidden">
        <AlertDialogLogoutButton isOpen={sidebarStatus} />
      </div>
    </div>
  );
}
